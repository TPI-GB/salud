const DisponibilidadUsuarioRepository = require("../repositories/disponibilidadUsuarioRepository");

class DisponibilidadUsuarioService {
    constructor() {
        this.disponibilidadUsuarioRepository = new DisponibilidadUsuarioRepository();
      }

    async createDisponibilidadUsuario(data){
    const disponibilidadUsuario = await this.disponibilidadUsuarioRepository.createDisponibilidadUsuario(data);
    return disponibilidadUsuario;
    }

    async editDisponibilidadUsuario(data) {
        const newDisponibilidadUsuario = await this.disponibilidadUsuarioRepository.editDisponibilidadUsuario(data);
        return newDisponibilidadUsuario;
      }

    async getDisponibilidadUsuario() {
        const disponibilidadUsuario = await this.disponibilidadMedicaRepository.getDisponibilidadUsuario();
        return disponibilidadUsuario;
      }

      async deleteDisponibilidadUsuario(id) {
        const disponibilidadUsuario = await this.disponibilidadUsuarioRepository.deleteDisponibilidadUsuario(id);
        return disponibilidadUsuario;
      }
}

module.exports = DisponibilidadUsuarioService;