const mongoose = require("mongoose");
const Lugar = require("./lugar-model");

const Schema = mongoose.Schema;

const TurnoSchema = Schema(
  {
    fecha: { type: Date, require: true },
    lugar: { type: Lugar, require: true },
    medico: { type: String },
    paciente: { type: String },
    disponible: { type: Boolean, require: true },
    esSobreTurno: { type: Boolean, require: true },
  },
  {
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = TurnoSchema;
