const Feriado = require("../models/feriadoModel");

class FeriadoRepository {
  async createFeriado(data) {
    const { fecha, description } = data;

    const fechaDate = new Date(fecha);

    try {
      const feriado = await Feriado.create({
        fecha: fechaDate,
        description,
      });
      console.log(feriado);
      return await feriado.save();
    } catch (err) {
      throw err;
    }
  }

  async editPlace(data) {
    const { fecha, descripcion } = data;
    try {
      let newData = {};

      if (fecha != "") {
        newData.fecha = fecha;
      }
      if (descripcion != "") {
        newData.descripcion = descripcion;
      }
      newData.features = features;

      await Feriado.findByIdAndUpdate({ _id: id }, newData);

      const feriadoStored = await Feriado.findById(id);

      return feriadoStored;
    } catch (err) {
      throw err;
    }
  }

  async getFeriado() {
    return await Feriado.find().lean().exec();
  }

  async deleteFeriado(id) {
    const feriado = await feriado.findById(id);
    return await Feriado.deleteOne({ _id: id });
  }
}
module.exports = FeriadoRepository;
