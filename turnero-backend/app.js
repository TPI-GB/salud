const express = require("express");
const cors = require("cors");
const app = express();
const DisponibilidadMedica = require("./controllers/disponibilidadMedicaController")

app.use(cors());

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let disponibilidadMedica = new DisponibilidadMedica;

app.use("/disponibilidadMedica", disponibilidadMedica.router);

module.exports = app;