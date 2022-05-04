const LugarRepository = require("../repositories/lugar-repository");

class LugarService {
  constructor() {
    this.lugarRepository = new LugarRepository();
  }

  async getLugares() {
    return this.lugarRepository.getLugares();
  }

  async crearLugar(data) {
    return this.lugarRepository.crearLugar(data);
  }

  async editarLugar(data) {
    return this.lugarRepository.editarLugar(data);
  }

  async borrarLugar(data) {
    return this.lugarRepository.borrarLugar(data);
  }
}
module.exports = LugarService;
