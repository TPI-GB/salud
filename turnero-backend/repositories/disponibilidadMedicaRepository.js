const DisponibilidadMedica = require("../models/disponibilidadMedicaModel");

class DisponibilidadMedicaRepository {
    async createDisponibilidadMedica(data) {
        const { horaInicio, horaFin, duracion } = data;
    
        const disponibilidadMedica = await DisponibilidadMedica.create({
          horaInicio,
          horaFin,
          duracion
        });
    
        return await disponibilidadMedica.save();
      }

      async editDisponibilidadMedica(data) {
        const { horaInicio, horaFin, duracion } = data;
    
        const newData = {};
    
        if (horaInicio != "") {
          newData.horaInicio = horaInicio;
        }
        if (horaFin != "") {
          newData.horaFin = horaFin;
        }
        if (duracion != ""){
            newData.duracion = duracion;
        }

        await DisponibilidadMedica.findByIdAndUpdate({ _id: id }, newData);

        const disponibilidadMedicaStored = await DisponibilidadMedica.findById(id);

        return disponibilidadMedicaStored;
    }

    async getDisponibilidadMedica() {
        return await DisponibilidadMedica.find().lean().exec();
      }

      async deleteDisponibilidadMedica(id) {
        return await DisponibilidadMedica.deleteOne({ _id: id });
      }
}

module.exports = DisponibilidadMedicaRepository;