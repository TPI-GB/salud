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
<<<<<<< HEAD

  console.log(data.roles);

  const { nombre, apellido, roles, contrasenia, email, tipodocumento, numerodocumento } = data
=======
  console.log(data.roles);

  const {
    nombre,
    apellido,
    roles,
    contrasenia,
    email,
    tipodocumento,
    numerodocumento,
  } = data;
>>>>>>> 64fcbae0e1fb15b45d2fe3c06364b502925db308

  const token = Buffer.from(email + ":" + contrasenia).toString("base64");
  const method = "Basic ";
  const encriptado = method + token;
<<<<<<< HEAD
  const usuario = {nombre, apellido, roles, tipodocumento, numerodocumento};
=======
  const usuario = { nombre, apellido, roles, tipodocumento, numerodocumento };
>>>>>>> 64fcbae0e1fb15b45d2fe3c06364b502925db308
  console.log(usuario);
  console.log(email);
  console.log(contrasenia);

  const response = await axios.post(
    "http://localhost:8080/users/register",
<<<<<<< HEAD
      usuario,
=======
    usuario,
>>>>>>> 64fcbae0e1fb15b45d2fe3c06364b502925db308
    {
      headers: {
        credentials: encriptado,
        "Content-Type": "application/json",
      },
    }
<<<<<<< HEAD
  ); 
=======
  );
>>>>>>> 64fcbae0e1fb15b45d2fe3c06364b502925db308
}

// export async function updateUser(data) {

// }
