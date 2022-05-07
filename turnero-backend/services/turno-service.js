const TurnoRepository = require("../repositories/turno-repository");

class TurnoService {
  constructor() {
    this.turnoRepository = new TurnoRepository();
  }

  async getTurnos() {
    return this.turnoRepository.getTurnos();
  }

  async crearTurno(data) {
    return this.turnoRepository.crearTurno(data);
  }

  async crearSobreTurno(data) {
    return this.turnoRepository.crearTurno(data);
  }

  async editarTurno(data) {
    return this.turnoRepository.editarTurno(data);
  }

  async asignarTurno(data) {
    return this.turnoRepository.editarTurno(data);
  }

  async borrarTurno(data) {
    return this.turnoRepository.borrarTurno(data);
  }

  async anularTurno(data) {
    return this.turnoRepository.anularTurno(data);
  }
}
module.exports = TurnoService;
