const mongoose = require("mongoose");
const Lugar = require("./lugar-model");

const Schema = mongoose.Schema;

const TurnoSchema = Schema(
  {
    fecha: { type: Date, required: true },
    lugar: { type: Lugar, required: true },
    medico: { type: String },
    paciente: { type: String },
    disponible: { type: Boolean, required: true },
  },
  {
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = TurnoSchema;