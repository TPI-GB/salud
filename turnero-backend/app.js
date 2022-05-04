const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
const feriadoController = require("./controllers/feriadoController");
const lugarController = require("./controllers/lugar-controller");
const turnoController = require("./controllers/turno-controller");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/places", lugarController.router);
app.use("/turns", turnoController.router);
app.use("/feriado", feriadoController.router);

module.exports = app;
module.exports = app;
