const MedicalHistory = require("../models/medical-history-model");

class MedicalHistoryRepository {
  async findAll() {
    return await MedicalHistory.find();
  }

  async findById(id) {
    return await MedicalHistory.findById(id);
  }

  async findByDocument(docType, docNumber) {
    return await MedicalHistory.find({
      tipoDocumento: docType,
      numeroDocumento: docNumber,
    });
  }

  async create(medicalHistoryData) {
    let newMedicalHistory = MedicalHistory(medicalHistoryData);

    return await newMedicalHistory.save();
  }

  async update(id, data) {
    return await MedicalHistory.findByIdAndUpdate({ _id: id }, data, {
      new: true,
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
