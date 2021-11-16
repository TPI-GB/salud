import axios from "axios";

export async function getAllMedicalHistories() {
  const response = await axios.get("http://localhost:8080/medical-histories/");

  return response;
}

export async function getMedicalHistoryById(id) {
  const response = await axios.get(
    `http://localhost:8080/medical-histories/${id}`
  );

  return response;
}

export async function getMedicalHistoryByDocument(docType, docNumber) {
  const response = await axios.get(
    `http://localhost:8080/medical-histories/${docType}/${docNumber}`
  );

  return response;
}
