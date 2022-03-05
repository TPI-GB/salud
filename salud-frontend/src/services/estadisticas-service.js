import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_API_URL,
  port: process.env.REACT_APP_API_PORT,
};

export async function getUserCount(startDate, endDate) {
  console.log(startDate);
  console.log(endDate);
  const response = await axios.get(
    `${config.baseURL}:${config.port}/stats/userCount`,
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
    `${config.baseURL}:${config.port}/stats/historyCount`,
    {
      params: {
        _startDate: startDate,
        _endDate: endDate,
      },
    }
  );

  return response;
}
