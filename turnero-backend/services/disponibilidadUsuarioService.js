const DisponibilidadUsuarioRepository = require("../repositories/disponibilidadUsuarioRepository");

class DisponibilidadUsuarioService {
  constructor() {
    this.disponibilidadUsuarioRepository =
      new DisponibilidadUsuarioRepository();
  }

  async createDisponibilidadUsuario(data) {
    const disponibilidadUsuario =
      await this.disponibilidadUsuarioRepository.createDisponibilidadUsuario(
        data
      );
    return disponibilidadUsuario;
  }

  async getDisponibilidadUsuario() {
    const disponibilidadUsuario =
      await this.disponibilidadUsuarioRepository.getDisponibilidadUsuario();
    return disponibilidadUsuario;
  }

  async deleteDisponibilidadUsuario(data) {
    const disponibilidadUsuario =
      await this.disponibilidadUsuarioRepository.deleteDisponibilidadUsuario(
        data
      );
    return disponibilidadUsuario;
  }

  async deleteDisponibilidadDeUsuario(data) {
    const disponibilidadUsuario =
      await this.disponibilidadUsuarioRepository.deleteDisponibilidadDeUsuario(
        data
      );
    return disponibilidadUsuario;
  }

  async getByUser(data) {
    const disponibilidadUsuario =
      await this.disponibilidadUsuarioRepository.getByUser(data);
    return disponibilidadUsuario;
  }
}

module.exports = DisponibilidadUsuarioService;
