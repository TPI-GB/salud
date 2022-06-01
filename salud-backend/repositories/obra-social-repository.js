const ObraSocial = require("../models/obra-social-model");

class ObraSocialRepository {
  async findAll() {
    return await ObraSocial.find();
  }
}

module.exports = ObraSocialRepository;
