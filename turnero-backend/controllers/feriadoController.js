const express = require("express");
const FeriadoService = require("../services/feriadoservice");

class FeriadoController {
  constructor() {
    this.feriadoService = new FeriadoService();
    this.router = express.Router();
    this.router.post("/", (req, res) => this.createFeriado(req, res));
    this.router.put("/:id", (req, res) => this.editFeriado(req, res)),
      this.router.get("/", (req, res) => this.getFeriado(req, res));
    this.router.delete("/", (req, res) => this.deleteFeriado(req, res));
  }

  createFeriado(req, res) {
    const data = req.body;

    console.log(data);

    const feriadoPromise = this.feriadoService.createFeriado(data);
    feriadoPromise
      .then((feriado) => {
        res.json(feriado);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }

  editFeriado(req, res) {
    const data = req.body;
    const { id } = req.params;
    data.id = id;
    const feriadoPromise = this.feriadoService.editFeriado(data);
    feriadoPromise
      .then((feriado) => {
        res.json(feriado);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }

  getFeriado(req, res) {
    const feriadoPromise = this.feriadoService.getFeriado();
    feriadoPromise
      .then((place) => {
        res.json(place);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  deleteFeriado(req, res) {
    const data = req.body;
    const { id } = data;
    const feriadoPromise = this.feriadoService.deleteFeriado(id);
    feriadoPromise
      .then((place) => {
        res.json(place);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  }
}

module.exports = FeriadoController;
