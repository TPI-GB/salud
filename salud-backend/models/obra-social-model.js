const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ObraSocialSchema = Schema(
  {
    nombre: { type: String },
    planes: { type: Array },
  },
  {
    collection: "obrasSociales",
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = mongoose.model("ObraSocial", ObraSocialSchema);
