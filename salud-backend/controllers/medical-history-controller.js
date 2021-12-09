const express = require("express");
const MedicalHistoryService = require("../services/medical-history-service");

class MedicalHistoryController {
  constructor() {
    this.medicalHistoryService = new MedicalHistoryService();
    this.router = express.Router();
    this.router.get("/", (req, res) => {
      this.getMedicalHistories(req, res);
    });
    this.router.get("/:id", (req, res) => {
      this.getMedicalHistoryById(req, res);
    });
    this.router.post("/create", (req, res) => {
      this.createMedicalHistory(req, res);
    });
    this.router.put("/:id", (req, res) => {
      this.updateMedicalHistory(req, res);
    });
    this.router.post("/:id/consultation", (req, res) => {
      this.addMedicalConsultation(req, res);
    });
    this.router.post("/:id/test", (req, res) => {
      this.addMedicalTest(req, res);
    });
    this.router.put("/:id/test/:idTest", (req, res) => {
      this.updateMedicalTest(req, res);
    });
    this.router.put("/:id/consultation/:idConsultation", (req, res) => {
      this.updateMedicalConsultation(req, res);
    });
  }

  getMedicalHistories(req, res) {
    let medicalHistoriesPromise =
      this.medicalHistoryService.getMedicalHistories();

    medicalHistoriesPromise
      .then((medicalHistories) => {
        res.status(200).json(medicalHistories);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  getMedicalHistoryById(req, res) {
    let medicalHistoryPromise =
      this.medicalHistoryService.getMedicalHistoryById(req.params.id);

    medicalHistoryPromise
      .then((medicalHistory) => {
        res.status(200).json(medicalHistory);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  getMedicalHistoryByDocument(req, res) {
    const docType = req.params.docType;
    const docNumber = req.params.docNumber;

    let medicalHistoryPromise =
      this.medicalHistoryService.getMedicalHistoryByDocument(
        docType,
        docNumber
      );

    medicalHistoryPromise
      .then((medicalHistory) => {
        res.status(200).json(medicalHistory);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  async createMedicalHistory(req, res) {
    const {
      numeroHistoriaClinica,
      tipoDocumento,
      numeroDocumento,
      nombre,
      apellido,
      nacionalidad,
      sexo,
      edad,
      ocupacionActual,
      estadoCivil,
      domicilioActual,
      raza,
    } = req.body;

    // Validar los inputs del usuario
    if (
      !(
        numeroHistoriaClinica &&
        tipoDocumento &&
        numeroDocumento &&
        nombre &&
        apellido &&
        nacionalidad &&
        sexo &&
        edad &&
        raza
      )
    ) {
      return res.status(400).json("Faltan campos requeridos!");
    }

    try {
      //Validar si el numero de historia clinica esta en uso
      const duplicatedNumber =
        await this.medicalHistoryService.getMedicalHistoryByNumber(
          numeroHistoriaClinica
        );

      if (duplicatedNumber) {
        return res
          .status(409)
          .json("Ya existe una historia clínica con el numero asignado");
      }

      const duplicatedDocument =
        await this.medicalHistoryService.getMedicalHistoryByDocument(
          tipoDocumento,
          numeroDocumento
        );

      if (duplicatedDocument) {
        return res
          .status(409)
          .json(
            "Ya existe una historia clínica con el tipo y numero de documento asignado"
          );
      }

      const medicalHistoryData = {
        numeroHistoriaClinica,
        tipoDocumento,
        numeroDocumento,
        nombre,
        apellido,
        nacionalidad,
        sexo,
        edad,
        ocupacionActual,
        estadoCivil,
        domicilioActual,
        raza,
      };

      const medicalHistoryStored =
        await this.medicalHistoryService.createMedicalHistory(
          medicalHistoryData
        );
      // devolver la historia clínica guardada
      return res.status(201).json(medicalHistoryStored);
    } catch (error) {
      console.log(error.message);
    }
  }

  updateMedicalHistory(req, res) {
    const id = req.params.id;
    const data = req.body;

    const updateMedicalHistoryPromise =
      this.medicalHistoryService.updateMedicalHistory(id, data);

    updateMedicalHistoryPromise
      .then((updatedMedicalHistory) => {
        res.status(200).json(updatedMedicalHistory);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  addMedicalConsultation(req, res) {
    const id = req.params.id;
    const data = req.body;

    const addMedicalConsultationPromise =
      this.medicalHistoryService.addMedicalConsultation(id, data);

    addMedicalConsultationPromise
      .then((addMedicalConsultation) => {
        res.status(200).json(addMedicalConsultation);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  updateMedicalConsultation(req, res) {
    const id = req.params.id;
    const idConsultation = req.params.idConsultation;
    const data = req.body;

    const updateMedicalConsultationPromise =
      this.medicalHistoryService.updateMedicalConsultation(
        id,
        idConsultation,
        data
      );

    updateMedicalConsultationPromise
      .then((updateMedicalConsultation) => {
        res.status(200).json(updateMedicalConsultation);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  addMedicalTest(req, res) {
    const id = req.params.id;
    const data = req.body;

    const addMedicalTestPromise = this.medicalHistoryService.addMedicalTest(
      id,
      data
    );

    addMedicalTestPromise
      .then((addMedicalTest) => {
        res.status(200).json(addMedicalTest);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  updateMedicalTest(req, res) {
    const id = req.params.id;
    const idTest = req.params.idTest;
    const data = req.body;

    const updateMedicalTestPromise =
      this.medicalHistoryService.updateMedicalTest(id, idTest, data);

    updateMedicalTestPromise
      .then((updateMedicalTest) => {
        res.status(200).json(updateMedicalTest);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }
}

module.exports = MedicalHistoryController;
