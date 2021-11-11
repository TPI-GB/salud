const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/user-controller");
const MedicalHistoryController = require("./controllers/medical-history-controller");

const app = express();
const userController = new UserController();
const medicalHistoryController = new MedicalHistoryController();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", userController.router);
app.use("/medical-histories", medicalHistoryController.router);

module.exports = app;
