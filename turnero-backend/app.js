const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const DisponibilidadMedica = require("./controllers/disponibilidadMedicaController");
const FeriadoController = require("./controllers/feriadoController");
const LugarController = require("./controllers/lugar-controller");
const TurnoController = require("./controllers/turno-controller");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;
let feriadoController = new FeriadoController();
let lugarController = new LugarController();
let turnoController = new TurnoController();
let disponibilidadMedica = new DisponibilidadMedica();

app.use("/places", lugarController.router);
app.use("/turns", turnoController.router);
app.use("/feriado", feriadoController.router);
app.use("/disponibilidadMedica", disponibilidadMedica.router);

module.exports = app;
