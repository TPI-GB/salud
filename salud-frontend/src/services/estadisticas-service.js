import axios from "axios";

export async function getUserCount(startDate, endDate) {
  const response = await axios.get(
    "REACT_APP_API_URL:REACT_APP_API_PORT/stats/userCount",
    {
      params: {
        _startDate: startDate,
        _endDate: endDate,
      },
    }
  );

  return response;
}

export async function getHistoryCount(startDate, endDate) {
  const response = await axios.get(
    "REACT_APP_API_URL:REACT_APP_API_PORT/stats/historyCount",
    {
      params: {
        _startDate: startDate,
        _endDate: endDate,
      },
    }
  );

  return response;
}
