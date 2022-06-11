const express = require("express");
const TurnoService = require("../services/turno-service");

class TurnoController {
  constructor() {
    this.turnoService = new TurnoService();
    this.router = express.Router();
    this.router.get("/id", (req, res) => {
      this.getTurnoById(req, res);
    });
    this.router.get("/", (req, res) => {
      this.getTurnos(req, res);
    });
    this.router.post("/buscador", (req, res) => {
      this.getTurnoPorNombreYFecha(req, res);
    });
    this.router.post("/", (req, res) => {
      this.crearTurno(req, res);
    });
    this.router.post("/on", (req, res) => {
      this.crearSobreTurno(req, res);
    });
    this.router.put("/edit", (req, res) => {
      this.editarTurno(req, res);
    });
    this.router.put("/asignar", (req, res) => {
      this.asignarTurno(req, res);
    });
    this.router.put("/liberar", (req, res) => {
      this.liberarTurno(req, res);
    });
    this.router.delete("/", (req, res) => {
      this.borrarTurno(req, res);
    });
    this.router.put("/anular", (req, res) => {
      this.anularTurno(req, res);
    });
    this.router.put("/anularTodos", (req, res) => {
      this.anularTodosLosTurnos(req, res);
    });
  }

  getTurnoById(req, res) {
    const data = req.body;

    const turnoPromise = this.turnoService.getTurnoById(data);

    turnoPromise
      .then((turnos) => {
        res.status(200).json(turnos);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  getTurnos(req, res) {
    const turnosPromise = this.turnoService.getTurnos();

    turnosPromise
      .then((turnos) => {
        res.status(200).json(turnos);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  getTurnoPorNombreYFecha(req, res) {
    const data = req.body;
    const turnoPromise = this.turnoService.getTurnoPorNombreYFecha(data);

    turnoPromise
      .then((turno) => {
        res.status(200).json(turno);
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

  liberarTurno(req, res) {
    const data = req.body;

    const turnoPromise = this.turnoService.liberarTurno(data);

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

  anularTurno(req, res) {
    const data = req.body;

    const turnoPromise = this.turnoService.anularTurno(data);

    turnoPromise
      .then((turno) => {
        res.status(200).json(turno);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  anularTodosLosTurnos(req, res) {
    const data = req.body;

    const turnoPromise = this.turnoService.anularTodosLosTurnos(data);

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
