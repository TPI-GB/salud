const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
const FeriadoController = require("./controllers/feriadoController");
const LugarController = require("./controllers/lugar-controller");
const TurnoController = require("./controllers/turno-controller");
app.use(cors());

let feriadoController = new FeriadoController();
let lugarController = new LugarController();
let turnoController = new TurnoController();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/places", lugarController.router);
app.use("/turns", turnoController.router);
app.use("/feriado", feriadoController.router);

module.exports = app;
module.exports = app;
