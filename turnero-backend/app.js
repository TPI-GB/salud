const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const FeriadoController = require("./controllers/feriadoController");
const LugarController = require("./controllers/lugar-controller");
const TurnoController = require("./controllers/turno-controller");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let feriadoController = new FeriadoController();
let lugarController = new LugarController();
let turnoController = new TurnoController();

app.use("/places", lugarController.router);
app.use("/turns", turnoController.router);
app.use("/feriado", feriadoController.router);

<<<<<<< HEAD
module.exports = app;
=======
module.exports = app;
>>>>>>> 60f25369f82f39a36c3d04866b40c6d26b8e6f7b
