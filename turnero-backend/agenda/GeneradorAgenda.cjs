const { mongoose } = require("mongoose");
const Turno = require("../models/turno-model");
const UsuarioDisponibilidad = require("../models/disponibilidadUsuarioModel");
const Feriado = require("../models/feriadoModel");

async function GeneradorAgenda(today, offset) {
  const mongoDB = "mongodb://127.0.0.1/turnerodb";
  await mongoose
    .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongoose connect");
    })
    .catch((err) => {
      console.error("App starting error:", err.stack);
      process.exit(1);
    });
  var db = mongoose.connection;

  const targetDay = today;

  targetDay.setDate(today.getDate() + offset);

  const esFeriado = await esFeriadoElDia(targetDay);
  if (!esFeriado) {
    const medicos = await UsuarioDisponibilidad.find().distinct("user");

    for await (const nombreMedico of medicos) {
      const medico = await UsuarioDisponibilidad.findOne({
        user: nombreMedico,
      });
      for (const disponibilidad of medico._doc.disponibilidades) {
        await crearTurnosParaMedico(medico, disponibilidad, targetDay);
      }
    }
  }
  console.log("END");
  db.close();
}

async function crearTurnosParaMedico(medico, disponibilidad, targetDay) {
  const turnosACrear = await calcularTurnosACrear(disponibilidad);
  console.log("---Turnos Generados este dia---");
  for (i = 0; i < turnosACrear.length; i++) {
    const turno = await Turno.create({
      fecha: targetDay,
      horaInicio: turnosACrear[i].hora,
      minutoInicio: turnosACrear[i].minuto,
      lugar: disponibilidad.lugar,
      medico: medico.user,
    });
    await turno.save();
    console.log(turno);
  }
}

async function calcularTurnosACrear(disponibilidad) {
  let turnos = [];
  let date = new Date();
  date.setHours(disponibilidad.horaInicio);
  date.setMinutes(disponibilidad.minutoInicio);
  date.setSeconds(0);
  date.setMilliseconds(0);
  while (date.getHours() <= disponibilidad.horaFin) {
    turnos.push({ hora: date.getHours(), minuto: date.getMinutes() });
    date.setMinutes(date.getMinutes() + disponibilidad.duracion);
  }
  return turnos;
}

async function esFeriadoElDia(day) {
  const feriado = await Feriado.findOne({ fecha: day });
  return feriado != null;
}

GeneradorAgenda(new Date(), 3).catch(console.dir);
