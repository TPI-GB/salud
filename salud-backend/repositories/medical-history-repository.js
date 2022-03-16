const MedicalHistory = require("../models/medical-history-model");

class MedicalHistoryRepository {
  async findAll() {
    return await MedicalHistory.find(
      {},
      "numeroHistoriaClinica tipoDocumento numeroDocumento nombre apellido"
    );
  }

  async findById(id) {
    return await MedicalHistory.findById(id, "-consultas -estudios");
  }

  async findDetailsById(id) {
    return await MedicalHistory.findById(id);
  }

  async findTestByIds(idHistory, idTest) {
    return await MedicalHistory.find(
      {
        _id: idHistory,
      },
      {
        estudios: {
          $elemMatch: {
            _id: idTest,
          },
        },
      },
      "estudios"
    );
  }

  async findConsultationByIds(idHistory, idConsultation) {
    return await MedicalHistory.findById(id, "consultas");
  }

  async findByDocument(docType, docNumber) {
    return await MedicalHistory.findOne(
      {
        tipoDocumento: docType,
        numeroDocumento: docNumber,
      },
      "numeroHistoriaClinica tipoDocumento numeroDocumento nombre apellido"
    );
  }

  async existsByDocument(docType, docNumber) {
    return await MedicalHistory.exists({
      tipoDocumento: docType,
      numeroDocumento: docNumber,
    });
  }

  async existsByNumber(medicalHistoryNumber) {
    return await MedicalHistory.exists({
      numeroHistoriaClinica: medicalHistoryNumber,
    });
  }

  async create(medicalHistoryData) {
    let newMedicalHistory = MedicalHistory(medicalHistoryData);

    return await newMedicalHistory.save();
  }

  async update(id, data) {
    return await MedicalHistory.findByIdAndUpdate({ _id: id }, data, {
      new: true,
      select: "-estudios -consultas -creacion -ultimaModificacion",
    });
  }

  async addConsultation(id, data) {
    const medicalHistory = await MedicalHistory.findById(id);
    medicalHistory.consultas.push(data);

    return await medicalHistory.save();
  }

  async updateConsultation(id, idConsultation, data) {
    const medicalHistory = await MedicalHistory.findById(id);

    const medicalConsultation = medicalHistory.consultas.id(idConsultation);

    medicalConsultation.set(data);

    return await medicalHistory.save();
  }

  async addTest(id, data) {
    const medicalHistory = await MedicalHistory.findById(id);
    medicalHistory.estudios.push(data);

    return await medicalHistory.save();
  }

  async updateTest(id, idTest, data) {
    const medicalHistory = await MedicalHistory.findById(id);

    const medicalTest = medicalHistory.estudios.id(idTest);

    medicalTest.set(data);

    return await medicalHistory.save();
  }
}

module.exports = MedicalHistoryRepository;
