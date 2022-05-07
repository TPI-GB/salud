const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TurnoSchema = Schema(
  {
    fecha: { type: Date, require: true },
    lugar: { type: String, require: true },
    medico: { type: String },
    paciente: { type: String, default: "" },
    disponible: { type: Boolean, require: true },
    esSobreTurno: { type: Boolean, require: true },
  },
  {
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = mongoose.model("Turnos", TurnoSchema);
