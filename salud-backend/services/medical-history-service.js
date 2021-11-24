const MedicalHistoryRepository = require("../repositories/medical-history-repository");

class MedicalHistoryService {
  constructor() {
    this.medicalHistoryRepository = new MedicalHistoryRepository();
  }

  async getMedicalHistories() {
    let medicalHistories = await this.medicalHistoryRepository.findAll();

    return medicalHistories;
  }

<<<<<<< HEAD
=======
  async getMedicalHistoryByDocument(docType, docNumber) {
    let medicalHistory = await this.medicalHistoryRepository.findByDocument(
      docType,
      docNumber
    );

    return medicalHistory;
  }

>>>>>>> 64fcbae0e1fb15b45d2fe3c06364b502925db308
  async getMedicalHistoryById(id) {
    let medicalHistory = await this.medicalHistoryRepository.findById(id);

    return medicalHistory;
  }

  async createMedicalHistory(medicalHistoryData) {
    let medicalHistory = await this.medicalHistoryRepository.create(
      medicalHistoryData
    );

    return medicalHistory;
  }

  async updateMedicalHistory(id, data) {
    const updatedMedicalHistory = await this.medicalHistoryRepository.update(
      id,
      data
    );

    return updatedMedicalHistory;
  }

  async addMedicalConsultation(id, data) {
    const medicalConsultation =
      await this.medicalHistoryRepository.addConsultation(id, data);

    return medicalConsultation;
  }

  async updateMedicalConsultation(id, idConsultation, data) {
    const medicalConsultation =
      await this.medicalHistoryRepository.updateConsultation(
        id,
        idConsultation,
        data
      );

    return medicalConsultation;
  }

  async addMedicalTest(id, data) {
    const medicalTest = await this.medicalHistoryRepository.addTest(id, data);

    return medicalTest;
  }

  async updateMedicalTest(id, idTest, data) {
    const medicalTest = await this.medicalHistoryRepository.updateTest(
      id,
      idTest,
      data
    );

    return medicalTest;
  }
}

module.exports = MedicalHistoryService;
