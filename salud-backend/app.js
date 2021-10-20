require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const appRoutes = require("./routes/appRoutes");

const app = express();

app.use(cors());
const port = process.env.port || 3001

app.use(express.json());

app.use("/v1", appRoutes);

module.exports = app;
