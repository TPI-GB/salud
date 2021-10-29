const express = require("express");
const auth = require("../middleware/auth");

const {
  updateUsuario,
  getUsuarios,
  getUsuario,
  registerUser,
  loginUser
} = require("../controllers/userController");
const api = express.Router();

api.get("/", getUsuarios);
api.get("/:id", getUsuario);
api.put("/:id", updateUsuario);
api.post("/register", auth, registerUser);
api.post("/login", loginUser);

module.exports = api;
