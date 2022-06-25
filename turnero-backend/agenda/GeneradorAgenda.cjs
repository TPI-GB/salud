const { mongoose } = require("mongoose");
const Turno = require("../models/turno-model");
const UsuarioDisponibilidad = require("../models/disponibilidadUsuarioModel");
const Feriado = require("../models/feriadoModel");

async function TryGeneradorAgenda(today, offset) {
  let attemps = 0;
  let success = false;
  while (attemps < 3 && !success) {
    try {
      await GeneradorAgenda(today, offset);
      success = true;
    } catch (err) {
      console.log("Error ejecutando intento " + attemps);
      console.log(err);
      attemps++;
    }
  }
}

async function GeneradorAgenda(today, offset) {
  const mongoConnect = async () => {
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
        return;
      });
  };
  await mongoConnect();
  var db = mongoose.connection;

  const turnos = await Turno.find().exec();

  const targetDay = today;

  if (turnos.size > 0) {
    // YA HAY TURNOS, CREO EL DIA QUE VIENE EN MESES.
    targetDay.setDate(targetDay.getDate() + offset);
    await iniciarCreacionDeTurnos(targetDay);
  } else {
    // NO HAY TURNOS, LA AGENDA INICIA CON TURNOS DE HOY A 2 MESES.
    let offsetCount = 0;
    while (offsetCount < 60) {
      if (offsetCount === 0) {
        console.log(targetDay);
        await iniciarCreacionDeTurnos(targetDay);
      } else {
        targetDay.setDate(targetDay.getDate() + 1);
        await iniciarCreacionDeTurnos(targetDay);
      }
      offsetCount += 1;
    }
  }

  console.log("END");
  db.close();
}

async function iniciarCreacionDeTurnos(targetDay) {
  console.log(
    "Turnos para el dia: " +
      targetDay.getDate() +
      "/" +
      targetDay.getMonth() +
      "/" +
      targetDay.getFullYear()
  );
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
  } else {
    console.log("FERIADO");
  }
}

async function crearTurnosParaMedico(medico, disponibilidad, targetDay) {
  const turnosACrear = await calcularTurnosACrear(disponibilidad, targetDay);
  for (i = 0; i < turnosACrear.length; i++) {
    const turno = await Turno.create({
      fecha: targetDay,
      horaInicio: turnosACrear[i].hora,
      minutoInicio: turnosACrear[i].minuto,
      lugar: disponibilidad.lugar,
      medico: medico.user,
    });
    await turno.save();
    console.log("");
    console.log(turno);
    console.log("");
  }
}

async function calcularTurnosACrear(disponibilidad, targetDay) {
  let turnos = [];
  let date = targetDay;
  date.setHours(disponibilidad.horaInicio);
  date.setMinutes(disponibilidad.minutoInicio);
  date.setSeconds(0);
  date.setMilliseconds(0);
  if (disponibilidad.diaDeSemana === date.getDay()) {
    // PREGUNTA SI ES UN DIA DE SEMANA QUE TRABAJA EL MEDICO
    while (
      date.getHours() < disponibilidad.horaFin ||
      (date.getHours() === disponibilidad.horaFin &&
        date.getMinutes() <= disponibilidad.minutoFin)
    ) {
      turnos.push({ hora: date.getHours(), minuto: date.getMinutes() });
      date.setMinutes(date.getMinutes() + disponibilidad.duracion);
    }
  }
  return turnos;
}

async function esFeriadoElDia(day) {
  const feriado = await Feriado.findOne({
    fecha: {
      $gte: new Date(day.getFullYear(), day.getMonth(), day.getDate()),
      $lt: new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1),
    },
  });
  return feriado != null;
}

TryGeneradorAgenda(new Date(), 30).catch(console.dir);
