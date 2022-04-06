import axios from "axios";
import moment from "moment";

const config = {
  baseURL: process.env.REACT_APP_API_URL,
  port: process.env.REACT_APP_API_PORT,
};

export async function getAllMedicalHistories() {
  const response = await axios.get(
    `${config.baseURL}:${config.port}/medical-histories/`
  );

  return response;
}

export async function getMedicalHistoryById(id) {
  const response = await axios.get(
    `${config.baseURL}:${config.port}/medical-histories/${id}`
  );

  return response;
}

export async function getMedicalHistoryDetailsById(id) {
  const response = await axios.get(
    `${config.baseURL}:${config.port}/medical-histories/details/${id}`
  );

  return response;
}

export async function getMedicalHistoryByDocument(docType, docNumber) {
  const response = await axios.get(
    `${config.baseURL}:${config.port}/medical-histories/${docType}/${docNumber}`
  );

  return response;
}

export async function createMedicalHistory(medicalHistoryData) {
  const response = await axios.post(
    `${config.baseURL}:${config.port}/medical-histories/create`,
    medicalHistoryData
  );

  return response;
}

export async function editMedicalHistory(id, medicalHistoryData) {
  const response = await axios.put(
    `${config.baseURL}:${config.port}/medical-histories/${id}`,
    medicalHistoryData
  );

  return response;
}

export function localTZDate(utcDate, format) {
  const localTZ = new Date(utcDate);

  return moment(localTZ).format(format);
}
