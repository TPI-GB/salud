const DisponibilidadUsuario = require("../models/disponibilidadUsuarioModel");

class DisponibilidadUsuarioRepository {
  async createDisponibilidadUsuario(data) {
    try {
      const {
        user,
        diaDeSemana,
        horaInicio,
        minutoInicio,
        horaFin,
        minutoFin,
        lugar,
      } = data;
      const disponibilidad = {
        user,
        diaDeSemana,
        horaInicio,
        minutoInicio,
        horaFin,
        minutoFin,
        lugar,
      };
      const usuario = await DisponibilidadUsuario.findOne({
        user: user,
      }).exec();
      if (usuario === null) {
        // NO HAY USUARIO CON ESTE NOMBRE, CREA UNO NUEVO.
        let disponibilidadesNuevas = [];
        disponibilidadesNuevas.push(disponibilidad);
        const nuevoUsuario = await DisponibilidadUsuario.create({
          user,
          disponibilidades: disponibilidadesNuevas,
        });
        return await nuevoUsuario.save();
      } else {
        // HAY UN USUARIO CON ESE NOMBRE, SE LE AGREGA LA DISPONIBILIDAD.
        let disponibilidadesNuevas = usuario.disponibilidades;
        disponibilidadesNuevas.push(disponibilidad);
        return await DisponibilidadUsuario.findByIdAndUpdate(
          { _id: usuario._id },
          { disponibilidades: disponibilidadesNuevas }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async editDisponibilidadUsuario(data) {
    const { user, disponibilidades } = data;

    const newData = {};

    if (user != "") {
      newData.user = user;
    }
    if (disponibilidades != "") {
      newData.disponibilidades = disponibilidades;
    }

    await DisponibilidadUsuario.findByIdAndUpdate({ _id: id }, newData);

    const disponibilidadUsuarioStored = await DisponibilidadUsuario.findById(
      id
    );

    return disponibilidadUsuarioStored;
  }

  async getDisponibilidadUsuario() {
    return await DisponibilidadUsuario.find().lean().exec();
  }

  async getByUser(data) {
    const { user } = data;
    return await DisponibilidadUsuario.findOne({ user: user }).exec();
  }

  async deleteDisponibilidadUsuario(data) {
    const { user } = data;
    const userDisponibilidad = await DisponibilidadUsuario.findOne({
      user: user,
    }).exec();
    return await DisponibilidadUsuario.deleteOne({
      _id: userDisponibilidad._id,
    });
  }

  async deleteDisponibilidadDeUsuario(data) {
    try {
      const { user, disponibilidad } = data;
      const userDisponibilidad = await DisponibilidadUsuario.findOne({
        user: user,
      }).exec();
      const newData = {};
      newData.disponibilidades = userDisponibilidad.disponibilidades.filter(
        (d) => disponibilidad._id != d._id
      );
      await DisponibilidadUsuario.findByIdAndUpdate(
        { _id: userDisponibilidad._id },
        newData
      );
      const disponibilidadUsuarioStored = await DisponibilidadUsuario.findById(
        userDisponibilidad._id
      );
      return disponibilidadUsuarioStored;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = DisponibilidadUsuarioRepository;
