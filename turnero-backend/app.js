const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const DisponibilidadUsuarioController = require("./controllers/disponibilidadUsuarioController");
const FeriadoController = require("./controllers/feriadoController");
const LugarController = require("./controllers/lugar-controller");
const TurnoController = require("./controllers/turno-controller");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let feriadoController = new FeriadoController();
let lugarController = new LugarController();
let turnoController = new TurnoController();
let disponibilidadUsuario = new DisponibilidadUsuarioController();

app.use("/places", lugarController.router);
app.use("/turns", turnoController.router);
app.use("/feriado", feriadoController.router);
app.use("/disponibilidadUsuario", disponibilidadUsuario.router);

module.exports = app;
