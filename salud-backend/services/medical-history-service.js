const MedicalHistoryRepository = require("../repositories/medical-history-repository");

class MedicalHistoryService {
  constructor() {
    this.medicalHistoryRepository = new MedicalHistoryRepository();
  }

  async getMedicalHistories() {
    let medicalHistories = await this.medicalHistoryRepository.findAll();

    return medicalHistories;
  }

  async getMedicalHistoryById(id) {
    let medicalHistory = await this.medicalHistoryRepository.findById(id);

    return medicalHistory;
  }

  async getMedicalHistoryDetailsById(id) {
    let medicalHistory = await this.medicalHistoryRepository.findDetailsById(
      id
    );

    return medicalHistory;
  }

  async getMedicalTestByIds(idHistory, idTest) {
    let medicalTest = await this.medicalHistoryRepository.findTestByIds(
      idHistory,
      idTest
    );

    return medicalTest;
  }

  async getMedicalConsultationByIds(idHistory, idConsultation) {
    let medicalConsultation =
      await this.medicalHistoryRepository.findConsultationByIds(
        idHistory,
        idConsultation
      );

    return medicalConsultation;
  }

  async getMedicalHistoryByDocument(docType, docNumber) {
    let medicalHistory = await this.medicalHistoryRepository.findByDocument(
      docType,
      docNumber
    );

    return medicalHistory;
  }
  //tomas
  async getMedicalConsultationByNameAndSurname(name, surname) {
    let medicalHistory =
      await this.medicalHistoryRepository.findByNameAndSurname(name, surname);

    return medicalHistory;
  }

  async existsMedicalHistoryByDocument(docType, docNumber) {
    return await this.medicalHistoryRepository.existsByDocument(
      docType,
      docNumber
    );
  }

  async existsMedicalHistoryByNumber(medicalHistoryNumber) {
    return await this.medicalHistoryRepository.existsByNumber(
      medicalHistoryNumber
    );
  }

  //tomas
  async existsMedicalHistoryByNameAndSurname(name, surname) {
    return await this.medicalHistoryRepository.existsByNameAndSurname(
      name,
      surname
    );
  }
  async getMedicalHistoryByNameAndSurname(name, surname) {
    return await this.medicalHistoryRepository.findByNameAndSurname(
      name,
      surname
    );
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
