const express = require("express");
// const upload = require("../libs/storage");
const { addUser, getUsuarios } = require("../controllers/userController");
const api = express.Router();

api.post("/users", addUser)
api.get("/users", getUsuarios)

module.exports = api;
