const Turno = require("../models/turno-model");
const { v4: uuidv4 } = require("uuid");

class PacienteRepository {
    async addPacienteATurno(data) {
      const { turno, paciente } = data;
      paciente.id = uuidv4();
      let newPaciente = {};
      newPaciente.pacientes = turno.pacientes.concat(paciente);
      await Turno.findByIdAndUpdate({ _id: turno._id }, newPaciente);
      const placeStored = await Turno.findById(turno._id);
      return placeStored;
    }
  
  }
  
  module.exports = PacienteRepository;