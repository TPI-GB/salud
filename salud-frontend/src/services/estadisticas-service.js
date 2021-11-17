import axios from "axios";

export async function getUserCount() {
  const response = await axios.get("http://localhost:8080/stats/userCount");

  return response;
}

export async function getHistoryCount() {
  const response = await axios.get("http://localhost:8080/stats/historyCount");

  return response;
}
