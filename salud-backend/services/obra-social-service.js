const ObraSocialRepository = require("../repositories/obra-social-repository");

class ObraSocialService {
  constructor() {
    this.ObraSocialRepository = new ObraSocialRepository();
  }

  async getObrasSociales() {
    let obrasSociales = await this.ObraSocialRepository.findAll();

    return obrasSociales;
  }
}

module.exports = ObraSocialService;
