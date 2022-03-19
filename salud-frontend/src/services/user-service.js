import axios from "axios";

export async function loginUser(credentials) {
  const { email, contrasenia } = credentials;

  const token = Buffer.from(email + ":" + contrasenia).toString("base64");
  const method = "Basic ";
  const encriptado = method + token;

  const response = await axios.post(
    "http://localhost:8080/users/login",
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
      "http://localhost:8080/users/register",
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
  const response = await axios.put(`http://localhost:8080/users/${id}`, data);

  return response;
}

export async function getUsers() {
  const response = await axios.get(`http://localhost:8080/users`);
  return response;
}

export async function getUserById(id) {
  const response = await axios.get(`http://localhost:8080/users/${id}`);

  return response;
}
