const Lugar = require("../models/lugar-model");

class LugarRepository {
  async getLugares() {
    return await Lugar.find();
  }

  async crearLugar(data) {
    const { nombre, descripcion, direccion, telefono } = data;
    try {
      const lugar = await Lugar.create({
        nombre,
        descripcion,
        direccion,
        telefono,
        activo: true,
      });
      return await lugar.save();
    } catch (err) {
      console.log(err);
    }
  }

  async editarLugar(data) {
    const { nombre, activo, direccion, descripcion, telefono } = data;
    try {
      let newData = {};

      newData.nombre = nombre;
      newData.activo = activo;
      newData.direccion = direccion;
      newData.descripcion = descripcion;
      newData.telefono = telefono;

      await Lugar.findByIdAndUpdate({ _id: id }, newData);

      const lugarStored = await Lugar.findById(id);

      return lugarStored;
    } catch (err) {
      console.log(err);
    }
  }

  async borrarLugar(data) {
    const { id } = data;
    try {
      return await Lugar.deleteOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = LugarRepository;
