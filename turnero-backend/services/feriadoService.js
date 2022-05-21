const FeriadoRepository = require("../repositories/feriadoRepository");

class FeriadoService {
  constructor() {
    this.feriadoRepository = new FeriadoRepository();
  }

  async createFeriado(data) {
    const feriado = await this.feriadoRepository.createFeriado(data);
    return feriado;
  }

  async editFeriado(data) {
    const newFeriado = await this.feriadoRepository.editFeriado(data);
    return newFeriado;
  }

  async getFeriado() {
    const feriado = await this.feriadoRepository.getFeriado(data);
    return feriado;
  }

  async deleteFeriado(id) {
    const feriado = await this.feriadoRepository.deleteFeriado(id);
    return feriado;
  }
}

module.exports = FeriadoService;
