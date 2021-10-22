const express = require("express");
const cors = require("cors");
const appRoutes = require("./routes/appRoutes");

const app = express();
const bodyParser = require("body-parser");

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1", appRoutes);

module.exports = app;
