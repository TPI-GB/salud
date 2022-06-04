const express = require("express");
const upload = require("../multer/storage");
const MedicalHistoryService = require("../services/medical-history-service");
const auth = require("../middleware/auth");
const rolMiddleware = require("../middleware/roles");

class MedicalHistoryController {
  constructor() {
    this.medicalHistoryService = new MedicalHistoryService();
    this.router = express.Router();
    this.router.get(
      "/",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.getMedicalHistories(req, res);
      }
    );
    this.router.get(
      "/:id",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.getMedicalHistoryById(req, res);
      }
    );
    this.router.get(
      "/details/:id",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.getMedicalHistoryDetailsById(req, res);
      }
    );
    this.router.get(
      "/:idHistory/test/:idTest",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.getMedicalTestByIds(req, res);
      }
    );
    this.router.get(
      "/:idHistory/consultation/:idConsultation",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.getMedicalConsultationByIds(req, res);
      }
    );
    this.router.get(
      "/:docType/:docNumber",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.getMedicalHistoryByDocument(req, res);
      }
    );

    this.router.post(
      "/create",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.createMedicalHistory(req, res);
      }
    );
    this.router.put(
      "/:id",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.updateMedicalHistory(req, res);
      }
    );
    this.router.post(
      "/:id/consultation",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.addMedicalConsultation(req, res);
      }
    );
    this.router.post(
      "/img",
      upload,
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        return res.status(200).json(req.file.filename);
      }
    );
    this.router.post(
      "/:id/test",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.addMedicalTest(req, res);
      }
    );
    this.router.put(
      "/:id/test/:idTest",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.updateMedicalTest(req, res);
      }
    );
    this.router.put(
      "/:id/consultation/:idConsultation",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.updateMedicalConsultation(req, res);
      }
    );
  }

  getMedicalHistories(req, res) {
    if (req.query.nombre || req.query.apellido) {
      return this.getMedicalHistoryByNameAndSurname(req, res);
    }
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

  getMedicalHistoryByNameAndSurname(req, res) {
    let medicalHistoryPromise =
      this.medicalHistoryService.getMedicalHistoryByNameAndSurname(
        req.query.nombre,
        req.query.apellido
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

  getMedicalHistoryDetailsById(req, res) {
    let medicalHistoryPromise =
      this.medicalHistoryService.getMedicalHistoryDetailsById(req.params.id);

    medicalHistoryPromise
      .then((medicalHistory) => {
        res.status(200).json(medicalHistory);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  getMedicalTestByIds(req, res) {
    const idHistory = req.params.idHistory;
    const idTest = req.params.idTest;

    let medicalTestPromise = this.medicalHistoryService.getMedicalTestByIds(
      idHistory,
      idTest
    );

    medicalTestPromise
      .then((test) => {
        res.status(200).json(test);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  getMedicalConsultationByIds(req, res) {
    const idHistory = req.params.idHistory;
    const idConsultation = req.params.idConsultation;

    let medicalConsultationPromise =
      this.medicalHistoryService.getMedicalConsultationByIds(
        idHistory,
        idConsultation
      );

    medicalConsultationPromise
      .then((consultation) => {
        res.status(200).json(consultation);
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
      paisDeNacimiento,
      sexo,
      edad,
      ocupacionActual,
      estadoCivil,
      domicilioActual,
      obraSocial,
      plan,
    } = req.body;

    // Validar los inputs del usuario
    if (
      !(
        numeroHistoriaClinica &&
        tipoDocumento &&
        numeroDocumento &&
        nombre &&
        apellido &&
        paisDeNacimiento &&
        sexo &&
        edad
      )
    ) {
      return res.status(400).json("Faltan campos requeridos!");
    }

    try {
      //Validar si el numero de historia clinica esta en uso
      const duplicatedNumber =
        await this.medicalHistoryService.existsMedicalHistoryByNumber(
          numeroHistoriaClinica
        );

      if (duplicatedNumber) {
        return res
          .status(409)
          .json("Ya existe una historia clínica con el numero asignado");
      }

      const duplicatedDocument =
        await this.medicalHistoryService.existsMedicalHistoryByDocument(
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
        paisDeNacimiento,
        sexo,
        edad,
        ocupacionActual,
        estadoCivil,
        domicilioActual,
        obraSocial,
        plan,
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
    console.log(data);

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
