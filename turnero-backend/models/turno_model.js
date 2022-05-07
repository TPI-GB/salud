const mongoose = require("mongoose");
const Lugar = require("./lugar-model");

const Schema = mongoose.Schema;

const TurnoSchema = Schema(
  {
    fecha: { type: Date, required: true },
    lugar: { type: String, required: true },
    medico: { type: String },
    paciente: { type: String, default: "" },
    disponible: { type: Boolean, require: true },
    esSobreTurno: { type: Boolean, require: true },
  },
  {
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = mongoose.model("Turno", TurnoSchema);
