const express = require("express");
// const upload = require("../libs/storage");
const { addUser } = require("../controllers/userController");
const api = express.Router();

api.post("/users", addUser);

module.exports = api;
