const express = require("express");
const EstadisticasService = require("../services/estadisticas-service");

class EstadisticasController {
  constructor() {
    this.estadisticasService = new EstadisticasService();
    this.router = express.Router();
    this.router.get("/", (req, res) => {
      this.getEstadisticasUsers(req, res);
      // });
      //   this.router.get("/:id", (req, res) => {
      //     this.getUserById(req, res);
      //   });
      //   this.router.post("/register", (req, res) => {
      //     this.registerUser(req, res);
      //   });
      //   this.router.post("/login", (req, res) => {
      //     this.loginUser(req, res);
      //   });
      //   this.router.put("/:id", (req, res) => {
      //     this.updateUser(req, res);
    });
  }

  getEstadisticasUsers(req, res) {
    let estadisticasPromise = this.estadisticasService.getUsers();

    usersPromise
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
}

module.exports = EstadisticasController;
