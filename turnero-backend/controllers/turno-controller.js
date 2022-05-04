const express = require("express");
const TurnoService = require("../services/turno-service");

class TurnoController {
  constructor() {
    this.turnoService = new TurnoService();
    this.router = express.Router();
    this.router.get("/", (req, res) => {
      this.getTurnos(req, res);
    });
    this.router.post("/", (req, res) => {
      this.crearTurno(req, res);
    });
    this.router.post("/on", (req, res) => {
      this.crearSobreTurno(req, res);
    });
    this.router.put("/", (req, res) => {
      this.editarTurno(req, res);
    });
    this.router.put("/", (req, res) => {
      this.asignarTurno(req, res);
    });
    this.router.delete("/", (req, res) => {
      this.borrarTurno(req, res);
    });
  }

  getTurnos(req, res) {
    const turnosPromise = this.lugarService.getTurnos();

    turnosPromise
      .then((turnos) => {
        res.status(200).json(turnos);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  crearTurno(req, res) {
    const data = req.body;

    const turnoPromise = this.turnoService.crearTurno(data);

    turnoPromise
      .then((turno) => {
        res.status(200).json(turno);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  crearSobreTurno(req, res) {
    const data = req.body;

    const turnoPromise = this.turnoService.crearSobreTurno(data);

    turnoPromise
      .then((turno) => {
        res.status(200).json(turno);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  editarTurno(req, res) {
    const data = req.body;

    const turnoPromise = this.turnoService.editarTurno(data);

    turnoPromise
      .then((turno) => {
        res.status(200).json(turno);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  asignarTurno(req, res) {
    const data = req.body;

    const turnoPromise = this.turnoService.asignarTurno(data);

    turnoPromise
      .then((turno) => {
        res.status(200).json(turno);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  borrarTurno(req, res) {
    const data = req.body;

    const turnoPromise = this.turnoService.borrarTurno(data);

    turnoPromise
      .then((turno) => {
        res.status(200).json(turno);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }
}
module.exports = TurnoController;
