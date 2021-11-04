const express = require("express");
const auth = require("../middleware/auth");

const {
  updateUser,
  getUsers,
  getUser,
  registerUser,
  loginUser
} = require("../controllers/userController");
const api = express.Router();

api.get("/", getUsers);
api.get("/:id", getUser);
api.put("/:id", updateUser);
api.post("/register", auth, registerUser);
api.post("/login", loginUser);

module.exports = api;
