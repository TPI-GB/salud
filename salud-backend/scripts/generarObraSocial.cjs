const mongoose = require("mongoose");
const ObraSocial = require("../models/obra-social-model");
const mongoDB = "mongodb://127.0.0.1/saludDb";

async function registrarObraSocial() {
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
  //CODIGO

  let obraSocialOsde = ObraSocial({
    nombre: "Osde",
    planes: ["210", "220", "310", "410"],
  });
  let obraSocialIoma = ObraSocial({
    nombre: "Ioma",
    planes: ["Voluntario", "Involuntario"],
  });
  let obraSocialPami = ObraSocial({
    nombre: "Pami",
    planes: ["Basico", "Normal", "Premium"],
  });
  let obraSocialGaleno = ObraSocial({
    nombre: "Galeno",
    planes: ["Oro", "Platino", "Bronce"],
  });

  await obraSocialOsde.save();
  await obraSocialIoma.save();
  await obraSocialPami.save();
  await obraSocialGaleno.save();
  console.log("END");
  db.close();
}

registrarObraSocial();
