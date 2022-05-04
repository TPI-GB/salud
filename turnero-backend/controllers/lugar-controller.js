const express = require("express");
const LugarService = require("../services/lugar-service");

class LugarController {
  constructor() {
    this.lugarService = new LugarService();
    this.router = express.Router();
    this.router.get("/", (req, res) => {
      this.getLugares(req, res);
    });
    this.router.post("/", (req, res) => {
      this.crearLugar(req, res);
    });
    this.router.put("/", (req, res) => {
      this.editarLugar(req, res);
    });
    this.router.delete("/", (req, res) => {
      this.borrarLugar(req, res);
    });
  }

  getLugares(req, res) {
    const lugaresPromise = this.lugarService.getLugares();

    lugaresPromise
      .then((lugares) => {
        res.status(200).json(lugares);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  crearLugar(req, res) {
    const data = req.body;
    const lugarPromise = this.lugarService.crearLugar(data);

    lugarPromise
      .then((lugar) => {
        res.status(200).json(lugar);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  editarLugar(req, res) {
    const data = req.body;
    const lugarPromise = this.lugarService.editarLugar(data);

    lugarPromise
      .then((lugar) => {
        res.status(200).json(lugar);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  borrarLugar(req, res) {
    const data = req.body;
    const lugarPromise = this.lugarService.borrarLugar(data);

    lugarPromise
      .then((lugar) => {
        res.status(200).json(lugar);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }
}
module.exports = LugarController;
