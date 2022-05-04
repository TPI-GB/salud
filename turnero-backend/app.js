const express = require("express");
const cors = require("cors");
const app = express();
const lugarController = require("./controllers/lugar-controller");

app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/places", lugarController.router);

module.exports = app;
