const DisponibilidadUsuario = require("../models/disponibilidadUsuarioModel");

class DisponibilidadUsuarioRepository {
    async createDisponibilidadUsuario(data) {
        const { user, disponibilidades} = data;
    
        const disponibilidadUsuario = await DisponibilidadUsuario.create({
          user,
          disponibilidades
        });
    
        return await disponibilidadUsuario.save();
      }

      async editDisponibilidadUsuario(data) {
        const { user, disponibilidades} = data;
    
        const newData = {};
    
        if (user != "") {
          newData.user = user;
        }
        if (disponibilidades != "") {
          newData.disponibilidades = disponibilidades;
        }

        await DisponibilidadUsuario.findByIdAndUpdate({ _id: id }, newData);

        const disponibilidadUsuarioStored = await DisponibilidadUsuario.findById(id);

        return disponibilidadUsuarioStored;
    }

    async getDisponibilidadUsuario() {
        return await DisponibilidadUsuario.find().lean().exec();
      }

      async deleteDisponibilidadUsuario(id) {
        return await DisponibilidadUsuario.deleteOne({ _id: id });
      }
}

module.exports = DisponibilidadUsuarioRepository;