const DisponibilidadUsuarioService = require("../services/disponibilidadUsuarioService");
const express = require("express");

class DisponibilidadUsuarioController {
  constructor() {
    this.disponibilidadUsuarioService = new DisponibilidadUsuarioService();
    this.router = express.Router();
    this.router.get("/", (req, res) => this.getDisponibilidadUsuario(req, res));
    this.router.delete("/", (req, res) =>
      this.deleteDisponibilidadUsuario(req, res)
    );
    this.router.delete("/disponibilidad", (req, res) =>
      this.deleteDisponibilidadDeUsuario(req, res)
    );
    this.router.post("/", (req, res) =>
      this.createDisponibilidadUsuario(req, res)
    );
    this.router.put("/getByUser", (req, res) => this.getByUser(req, res));
  }

  createDisponibilidadUsuario(req, res) {
    const data = req.body;
    const disponibilidadUsuarioPromise =
      this.disponibilidadUsuarioService.createDisponibilidadUsuario(data);
    disponibilidadUsuarioPromise
      .then((disponibilidadUsuario) => {
        res.json(disponibilidadUsuario);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }

  getDisponibilidadUsuario(req, res) {
    const disponibilidadUsuarioPromise =
      this.disponibilidadUsuarioService.getDisponibilidadUsuario();
    disponibilidadUsuarioPromise
      .then((disponibilidadUsuario) => {
        res.json(disponibilidadUsuario);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  getByUser(req, res) {
    const data = req.body;
    const disponibilidadUsuarioPromise =
      this.disponibilidadUsuarioService.getByUser(data);
    disponibilidadUsuarioPromise
      .then((disponibilidadUsuario) => {
        res.json(disponibilidadUsuario);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  deleteDisponibilidadUsuario(req, res) {
    const data = req.body;
    const disponibilidadUsuario =
      this.disponibilidadUsuarioService.deleteDisponibilidadUsuario(data);
    disponibilidadUsuario
      .then((disponibilidadUsuario) => {
        res.json(disponibilidadUsuario);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }

  deleteDisponibilidadDeUsuario(req, res) {
    const data = req.body;
    const disponibilidadUsuario =
      this.disponibilidadUsuarioService.deleteDisponibilidadDeUsuario(data);
    disponibilidadUsuario
      .then((disponibilidadUsuario) => {
        res.json(disponibilidadUsuario);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }
}

module.exports = DisponibilidadUsuarioController;
