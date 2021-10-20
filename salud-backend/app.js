const express = require("express");
const cors = require("cors");
const appRoutes = require("./routes/appRoutes");

const app = express();

app.use(cors());
// app.use(urlencoded({ extended: false }));
// npmapp.use(json());

app.use("/v1", appRoutes);

module.exports = app;
