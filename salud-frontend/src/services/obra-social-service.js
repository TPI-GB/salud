import axios from "axios";
import config from "../config";

export async function getObrasSociales() {
  const response = await axios.get(
    `${config.baseURL}${config.port}/obras-sociales`
  );
  return response;
}
