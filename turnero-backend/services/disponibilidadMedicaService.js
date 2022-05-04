const DisponibilidadMedicaRepository = require("../repositories/disponibilidadMedicaRepository");

class DisponibilidadMedicaService {
    constructor() {
        this.disponibilidadMedicaRepository = new DisponibilidadMedicaRepository();
      }

    async createDisponibilidadMedica(data){
    const disponibilidadMedica = await this.disponibilidadMedicaRepository.createDisponibilidadMedica(data);
    return disponibilidadMedica;
    }

    async editDisponibilidadMedica(data) {
        const newDisponibilidadMedica = await this.disponibilidadMedicaRepository.editDisponibilidadMedica(data);
        return newDisponibilidadMedica;
      }

    async getDisponibilidadMedica() {
        const disponibilidadMedica = await this.disponibilidadMedicaRepository.getDisponibilidadMedica();
        return disponibilidadMedica;
      }

      async deleteDisponibilidadMedica(id) {
        const disponibilidadMedica = await this.disponibilidadMedicaRepository.deleteDisponibilidadMedica(id);
        return disponibilidadMedica;
      }
}

module.exports = DisponibilidadMedicaService;