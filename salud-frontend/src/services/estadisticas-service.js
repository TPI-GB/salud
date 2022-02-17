import axios from "axios";

export async function getUserCount(startDate, endDate) {
  const response = await axios.get("http://localhost:8080/stats/userCount", {
    params: {
      _startDate: startDate,
      _endDate: endDate,
    },
  });

  return response;
}

export async function getHistoryCount(startDate, endDate) {
  const response = await axios.get("http://localhost:8080/stats/historyCount", {
    params: {
      _startDate: startDate,
      _endDate: endDate,
    },
  });

  return response;
}
