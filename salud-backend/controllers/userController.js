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

module.exports = {
  addUser,
  //getProducts
};
