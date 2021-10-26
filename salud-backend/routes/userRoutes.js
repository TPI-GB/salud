const express = require("express");
// const upload = require("../libs/storage");
const {
  addUser,
  updateUsuario,
  getUsuarios,
  getUsuario,
} = require("../controllers/userController");
const api = express.Router();

api.post("/", addUser);
api.get("/", getUsuarios);
api.get("/:id", getUsuario);
api.put("/:id", updateUsuario);

module.exports = api;
