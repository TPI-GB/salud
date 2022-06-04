const PacienteSevice = require("../services/pacienteService");
const express = require("express");

class PacienteController {
  constructor() {
    this.pacienteService = new PacienteSevice();
    this.router = express.Router();
    this.router.put("/", (req, res) => this.addPacienteATurno(req, res));
    
  }

  addPacienteATurno(req, res) {
    const data = req.body;
    if (!data.turno || !data.paciente) {
      return res.status(400).send("All fields are required");
    }
    const pacientePromise = this.pacienteService.addPacienteATurno(data);
    commentPromise
      .then((paciente) => {
        res.json(paciente);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }


}

module.exports = PacienteController;