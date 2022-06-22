const DisponibilidadUsuarioService = require("../services/disponibilidadUsuarioService");
const express = require("express");

class DisponibilidadUsuarioController {
  constructor() {
    this.disponibilidadUsuarioService = new DisponibilidadUsuarioService();
    this.router = express.Router();
    this.router.put("/:id", (req, res) =>
      this.editDisponibilidadUsuario(req, res)
    );
    this.router.get("/", (req, res) => this.getDisponibilidadUsuario(req, res));
    this.router.delete("/", (req, res) =>
      this.deleteDisponibilidadUsuario(req, res)
    );
    this.router.post("/", (req, res) =>
      this.createDisponibilidadUsuario(req, res)
    );
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

  editDisponibilidadUsuario(req, res) {
    const data = req.body;
    const { id } = req.params;
    data.id = id;
    const disponibilidadUsuarioPromise =
      this.disponibilidadUsuarioService.editDisponibilidadUsuario(data);
    disponibilidadUsuarioPromise
      .then((disponibilidadUsuario) => {
        res.json(disponibilidadUsuario);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
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

  deleteDisponibilidadUsuario(req, res) {
    const data = req.body;
    console.log(data);
    const { id } = data;
    const disponibilidadUsuario =
      this.disponibilidadUsuarioService.deleteDisponibilidadUsuario(id);
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
