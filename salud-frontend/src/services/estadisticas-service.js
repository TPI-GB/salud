import axios from "axios";
import config from "../config";

export async function getUserCount(startDate, endDate) {
  console.log(startDate);
  console.log(endDate);
  const response = await axios.get(
    `${config.baseURL}${config.port}/stats/userCount`,
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
    `${config.baseURL}${config.port}/stats/historyCount`,
    {
      params: {
        _startDate: startDate,
        _endDate: endDate,
      },
    }
  );

  return response;
}
