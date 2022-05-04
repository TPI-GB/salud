const express = require("express");
const DisponibilidadMedicaService = require("../services/disponibilidadMedicaService");

class DisponibilidadMedicaController {
    constructor (){
        this.disponibilidadMedicaService = new DisponibilidadMedicaService();
        this.router = express.Router();
        this.router.post("/", (req, res) => this.createDisponibilidadMedica(req, res));
        this.router.put("/:id", (req, res) => this.editDisponibilidadMedica(req, res));
        this.router.get("/", (req, res) => this.getDisponibilidadMedica(req, res));
        this.router.delete("/", (req, res) => this.deleteDisponibilidadMedica(req, res));
    }

    createDisponibilidadMedica(req, res){
        const data = req.body;
    if (!data.horaInicio && !data.horaFin && !data.duracion) {
      return res.status(400).send("All fields are required");
    }
    const disponibilidadMedicaPromise = this.disponibilidadMedicaService.createDisponibilidadMedica(data);
    disponibilidadMedicaPromise
      .then((disponibilidadMedica) => {
        res.json(disponibilidadMedica);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
    }

    editDisponibilidadMedica(req, res) {
        const data = req.body;
        const { id } = req.params;
        data.id = id;
        const disponibilidadMedicaPromise = this.disponibilidadMedicaService.editDisponibilidadMedica(data);
        disponibilidadMedicaPromise
          .then((disponibilidadMedica) => {
            res.json(disponibilidadMedica);
          })
          .catch((err) => {
            res.status(400).json(err);
            console.log(err);
          });
      }

      getDisponibilidadMedica(req, res) {
        const disponibilidadMedicaPromise = this.disponibilidadMedicaService.getDisponibilidadMedica();
        disponibilidadMedicaPromise
          .then((disponibilidadMedica) => {
            res.json(disponibilidadMedica);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      }

      deleteDisponibilidadMedica(req, res) {
        const data = req.body;
        console.log(data);
        const { id } = data;
        const disponibilidadMedica = this.disponibilidadMedicaService.deleteDisponibilidadMedica(id);
        disponibilidadMedica
          .then((disponibilidadMedica) => {
            res.json(disponibilidadMedica);
          })
          .catch((err) => {
            res.status(400).json(err);
            console.log(err);
          });
      }
}

module.exports = DisponibilidadMedicaController;