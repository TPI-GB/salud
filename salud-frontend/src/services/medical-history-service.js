import axios from "axios";
import moment from "moment";
import config from "../config";

export async function getAllMedicalHistories() {
  const response = await axios.get(
    `${config.baseURL}${config.port}/medical-histories/`
  );

  return response;
}

export async function getMedicalHistoryById(id) {
  const response = await axios.get(
    `${config.baseURL}${config.port}/medical-histories/${id}`
  );

  return response;
}

export async function getMedicalHistoryDetailsById(id) {
  const response = await axios.get(
    `${config.baseURL}${config.port}/medical-histories/details/${id}`
  );

  return response;
}

export async function getMedicalTestByIds(idHistory, idTest) {
  const response = await axios.get(
    `${config.baseURL}${config.port}/medical-histories/${idHistory}/test/${idTest}`
  );

  return response;
}

export async function createMedicalTest(idHistory, medicalTestData) {
  console.log(idHistory);
  console.log(medicalTestData);
  const formData = new FormData();

  formData.append("nombre", medicalTestData.nombre);
  formData.append("textoLibre", medicalTestData.textoLibre);
  formData.append("archivos", medicalTestData.archivos);

  console.log(formData);

  const response = await axios.post(
    `${config.baseURL}${config.port}/medical-histories/${idHistory}/test`,
    medicalTestData
  );

  return response;
}

export async function saveImageAndGetName(file) {
  const formdata = new FormData();
  formdata.append("image", file);
  const response = await fetch(
    `${config.baseURL}${config.port}/medical-histories/img`,
    {
      method: "POST",
      enctype: "multipart/form-data",
      body: formdata,
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
  return response;
}

export async function editMedicalTest(idHistory, idTest, medicalTestData) {
  const response = await axios.put(
    `${config.baseURL}${config.port}/medical-histories/${idHistory}/test/${idTest}`,
    medicalTestData
  );

  return response;
}

export async function getMedicalConsultationByIds(idHistory, idConsultation) {
  const response = await axios.get(
    `${config.baseURL}${config.port}/medical-histories/${idHistory}/consultation/${idConsultation}`
  );

  return response;
}

export async function createMedicalConsultation(
  idHistory,
  medicalConsultationData
) {
  const response = await axios.post(
    `${config.baseURL}${config.port}/medical-histories/${idHistory}/consultation`,
    medicalConsultationData
  );

  return response;
}

export async function editMedicalConsultation(
  idHistory,
  idConsultation,
  medicalConsultationData
) {
  const response = await axios.put(
    `${config.baseURL}${config.port}/medical-histories/${idHistory}/consultation/${idConsultation}`,
    medicalConsultationData
  );

  return response;
}

export async function getMedicalHistoryByDocument(docType, docNumber) {
  const response = await axios.get(
    `${config.baseURL}${config.port}/medical-histories/${docType}/${docNumber}`
  );

  return response;
}

export async function getMedicalHistoryByNameAndSurname(name, surname) {
  const response = await axios.get(
    `${config.baseURL}${config.port}/medical-histories?nombre=${name}&apellido=${surname}`
  );

  return response;
}

export async function createMedicalHistory(medicalHistoryData) {
  const response = await axios.post(
    `${config.baseURL}${config.port}/medical-histories/create`,
    medicalHistoryData
  );

  return response;
}

export async function editMedicalHistory(id, medicalHistoryData) {
  const response = await axios.put(
    `${config.baseURL}${config.port}/medical-histories/${id}`,
    medicalHistoryData
  );

  return response;
}

export function localTZDate(utcDate, format) {
  const localTZ = new Date(utcDate);

  return moment(localTZ).format(format);
}
