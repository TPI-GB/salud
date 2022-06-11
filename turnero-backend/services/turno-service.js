const TurnoRepository = require("../repositories/turno-repository");

class TurnoService {
  constructor() {
    this.turnoRepository = new TurnoRepository();
  }

  async getTurnoById(id){
    return this.turnoRepository.getTurnoById(id);
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
    return this.turnoRepository.asignarTurno(data);
  }

  async borrarTurno(data) {
    return this.turnoRepository.borrarTurno(data);
  }

  async getTurnoPorNombreYFecha(data) {
    return this.turnoRepository.getTurnoPorNombreYFecha(data);
  }

  async anularTurno(data) {
    return this.turnoRepository.anularTurno(data);
  }

  async anularTodosLosTurnos(data) {
    return this.turnoRepository.anularTodosLosTurnos(data);
  }

  async liberarTurno(data) {
    return this.turnoRepository.liberarTurno(data);
  }
}
module.exports = TurnoService;
