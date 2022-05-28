import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

async function GetTurnosFilter(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/turns/buscador`,
      method: "POST",
      data: data,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

const petitions = {
  GetTurnosFilter,
};

export default petitions;
