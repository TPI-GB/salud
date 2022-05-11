const mongoose = require("mongoose");
const Turno = require("./turno-model");

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

  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  let date = new Date();

  const turno = await Turno.create({
    fecha: date,
    lugar: "Un Lugar",
    medico: "Pepe",
    disponible: true,
    esSobreTurno: false,
  });
  await turno.save();
  db.close();
  console.log("END");
}

GeneradorAgenda().catch(console.dir);
