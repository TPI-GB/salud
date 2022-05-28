const express = require("express");
const ObraSocialService = require("../services/obra-social-service");
const auth = require("../middleware/auth");
const rolMiddleware = require("../middleware/roles");
class ObraSocialController {
  constructor() {
    this.ObraSocialService = new ObraSocialService();
    this.router = express.Router();
    this.router.get(
      "/",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.getObrasSociales(req, res);
      }
    );
  }

  getObrasSociales(req, res) {
    let obrasSocialesPromise = this.ObraSocialService.getObrasSociales();
    //seguir retocando esto
    obrasSocialesPromise
      .then((obrasSociales) => {
        res.status(200).json(obrasSociales);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }
}

module.exports = ObraSocialController;
