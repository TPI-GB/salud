const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Registrar
async function registerUser(req, res) {

  // La logica del registro empieza aca
  try {
    // Conseguir los inputs del usuario
    const {
      nombre,
      apellido,
      nick,
      roles,
      activo,
      tipodocumento,
      numerodocumento,
      debecambiarcontrasenia,
    } = req.body;

    const authHeader = req.headers.credentials;

    let email, contrasenia;
      if (authHeader) {
        const method = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (method && method === "Basic" && token) {
            const b = Buffer.from(token, 'base64')
            const value = b.toString().split(':');
            email = value[0]
            contrasenia = value[1]
        }
      }

    // Validar los inputs del usuario
    if (!(email && contrasenia && tipodocumento && numerodocumento)) {
      res.status(400).send("Faltan campos requeridos!");
    }

    // Validar si el usuario existe en la base de datos
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("El usuario ya existe");
    }

    //Encriptar la contraseña del usuario
    contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);

    // Armar el usuario que se va a guardar
    const user = User({
      nombre,
      apellido,
      nick,
      roles,
      contrasenia : contraseniaEncriptada,
      email: email.toLowerCase(), // pasar el email a minusculas
      activo,
      tipodocumento,
      numerodocumento,
      debecambiarcontrasenia,
    });

    // guardar el usuario en la base de datos
    const userStored = await user.save();

    // devolver el usuario guardado
    res.status(201).json(userStored);
  } catch (err) {
    console.log(err);
  }
  // La logica del registro termina aca
};

async function loginUser (req, res)  {

  // La logica del login empieza aca
  try {
    // Conseguir los inputs del usuario
    const authHeader = req.headers.authorization;

    let email, contrasenia;
      if (authHeader) {
        const method = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (method && method === "Basic" && token) {
            const b = Buffer.from(token, 'base64')
            const value = b.toString().split(':');
            email = value[0]
            contrasenia = value[1]
        }
      }

    // Validar los inputs del usuario
    if (!(email && contrasenia)) {
      res.status(400).send("Se requieren todos los campos!");
    }
    // Validar si el usuario existe en la base de datos
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(contrasenia, user.contrasenia))) {
      // Crear Token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5m",
        }
      );

      // Agrega el token al usuario (NO A LA DB)
      user.token = token;

      // Usuario
      return res.status(200).json(user);
    }
    res.status(400).send("Credenciales invalidas");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

async function getUsers(req, res) {
  const usuarios = await User.find().lean().exec();
  res.status(200).send({ usuarios });
}

async function getUser(req, res) {
  try {
    const id = req.params.id;

    const usuario = await User.findById(id);

    res.status(200).send({ usuario });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;

    const actualizado = await User.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    res.status(200).send({ actualizado });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

module.exports = {
  updateUser,
  getUser,
  getUsers,
  registerUser,
  loginUser
};
