const PacienteRepository = require("../repositories/pacienteRepository")

class PacienteSevice {
  constructor() {
    this.pacienteRepository = new PacienteRepository();
  }

  async addPacienteATurno(data) {
    const paciente = await this.pacienteRepository.addPacienteATurno(data);
    return paciente;
  }

}

module.exports = PacienteSevice;