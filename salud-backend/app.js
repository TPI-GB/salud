require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const appRoutes = require("./routes/appRoutes");

const app = express();
const bodyParser = require("body-parser");

app.use(cors());
<<<<<<< HEAD
const port = process.env.port || 3001

app.use(express.json());
=======
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
>>>>>>> 81981cf (creados esquema basico de usuario)

app.use("/v1", appRoutes);

module.exports = app;
