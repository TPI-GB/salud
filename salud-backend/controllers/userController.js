const User = require("../models/User");

async function addUser(req, res) {
  try {
    const {
      nombre,
      apellido,
      nick,
      roles,
      contrasenia,
      mail,
      activo,
      tipodocumento,
      numerodocumento,
      debecambiarcontrasenia,
    } = req.body;

    const user = User({
      nombre,
      apellido,
      nick,
      roles,
      contrasenia,
      mail,
      activo,
      tipodocumento,
      numerodocumento,
      debecambiarcontrasenia,
    });

    const userStored = await user.save();

    res.status(201).send({ userStored });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

async function getUsuarios(req, res) {
  const usuarios = await User.find().lean().exec()
  res.status(200).send({ usuarios })
}

async function getUsuario(req, res) {
  try {
    const id = req.params.id

    const usuario = await User.findById(id)

    res.status(200).send({ usuario })
  } catch(e) {
    res.status(500).send({ message: e.message });
  }
}
module.exports = {
  addUser,
  getUsuarios,
  getUsuario,
};
