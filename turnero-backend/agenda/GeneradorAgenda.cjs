const { mongoose } = require("mongoose");
const Turno = require("../models/turno-model");

async function GeneradorAgenda() {
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
  let date = new Date();
  let date2 = new Date();
  date.setHours(07, 00, 00);
  date2.setHours(14, 00, 00);
  date2.setMonth(date.getDate() + 3);
  while (date < date2) {
    const turno = await Turno.create({
      fecha: date,
      lugar: "Un Lugar",
      medico: "Pepe",
      disponible: true,
      esSobreTurno: false,
    });
    await turno.save();
    if (date.getHours() === 14) {
      date.setDate(date.getDate() + 1);
      date.setHours(07, 00, 00);
    }
    date.setMinutes(date.getMinutes() + 30);
    console.log(date.getHours());
  }
  console.log("END");
  db.close();
}

GeneradorAgenda().catch(console.dir);
