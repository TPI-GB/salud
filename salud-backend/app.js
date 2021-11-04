const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/user-controller");

const app = express();
const bodyParser = require("body-parser");
const userController = new UserController();


// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", userController.router);

module.exports = app;
