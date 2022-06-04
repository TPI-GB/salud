const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TurnoSchema = Schema(
  {
    fecha: { type: Date, require: true },
    horaInicio: { type: Number, require: true },
    minutoInicio: { type: Number, require: true },
    medico: { type: String },
    paciente: { type: String, default: "" },
    disponible: { type: Boolean, default: true },
    anular: { type: Boolean, default: false },
    esSobreTurno: { type: Boolean, default: true },
    lugar: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Turnos", TurnoSchema);
