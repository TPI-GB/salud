const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
const FeriadoController = require("./controllers/feriadoController");

app.use(cors());

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let feriadoController = new FeriadoController();

app.use("/feriado", feriadoController.router);




module.exports = app;