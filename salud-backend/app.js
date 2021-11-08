const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/user-controller");

const app = express();
const userController = new UserController();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", userController.router);

module.exports = app;
