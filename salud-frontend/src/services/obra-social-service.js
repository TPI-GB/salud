import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_API_URL,
  port: process.env.REACT_APP_API_PORT,
};

export async function getObrasSociales() {
  const response = await axios.get(
    `${config.baseURL}:${config.port}/obras-sociales`
  );
  return response;
}
