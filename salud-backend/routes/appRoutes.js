const express = require("express");
// const upload = require("../libs/storage");
const { addUser, getUsuarios, getUsuario } = require("../controllers/userController");
const api = express.Router();

api.post("/users", addUser)
api.get("/users", getUsuarios)
api.get("/user/:id", getUsuario )

module.exports = api;
