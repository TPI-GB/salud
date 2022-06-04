import axios from "axios";
const config = {
  baseURL: process.env.REACT_APP_API_URL,
  port: process.env.REACT_APP_API_PORT,
};

export async function loginUser(credentials) {
  const { email, contrasenia } = credentials;

  const token = Buffer.from(email + ":" + contrasenia).toString("base64");
  const method = "Basic ";
  const encriptado = method + token;

  const response = await axios.post(
    `${config.baseURL}:${config.port}/users/login`,
    {},
    {
      headers: {
        Authorization: encriptado,
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}

export async function createUser(data) {
  const {
    nombre,
    apellido,
    roles,
    contrasenia,
    email,
    tipodocumento,
    numerodocumento,
  } = data;

  const token = Buffer.from(email + ":" + contrasenia).toString("base64");
  const method = "Basic ";
  const encriptado = method + token;
  const usuario = { nombre, apellido, roles, tipodocumento, numerodocumento };
  console.log(usuario);
  console.log(email);
  console.log(contrasenia);

  try {
    const response = await axios.post(
      `${config.baseURL}:${config.port}/users/register`,
      usuario,
      {
        headers: {
          credentials: encriptado,
          "Content-Type": "application/json",
        },
      }
    );
    return 0;
  } catch (err) {
    console.log(err);
    return 1;
  }
}

export async function updateUser(id, data) {
  const response = await axios.put(
    `${config.baseURL}:${config.port}/users/${id}`,
    data
  );

  return response;
}

export async function getUsers() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const response = await axios.get(`${config.baseURL}:${config.port}/users`, {

    headers: {
      Authorization: `Bearer ${user.data.token}`,
    },
  });
  return response;
}

export async function getUserById(id) {
  const response = await axios.get(
    `${config.baseURL}:${config.port}/users/${id}`
  );

  return response;
}

export async function getUserByDocument(tipodocumento, numerodocumento) {
  const response = await axios.get(
    `${config.baseURL}:${config.port}/users/${tipodocumento}/${numerodocumento}`
  );

  return response;
}
