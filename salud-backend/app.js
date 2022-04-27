const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/user-controller");
const MedicalHistoryController = require("./controllers/medical-history-controller");
const StatisticsController = require("./controllers/estadisticas-controller");

const app = express();
const userController = new UserController();
const medicalHistoryController = new MedicalHistoryController();
const estadisticasController = new StatisticsController();

// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", userController.router);
app.use("/medical-histories", medicalHistoryController.router);
app.use("/stats", estadisticasController.router);
app.use("/images", express.static("images"));

module.exports = app;
