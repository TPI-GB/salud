const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TurnoSchema = Schema(
  {
    fecha: { type: Date, required: true },
    lugar: { type: String, required: true },
    horaInicio: { type: Number, require: true },
    minutoInicio: { type: Number, require: true },
    medico: { type: String },
    paciente: { type: Object, default: "" },
    disponible: { type: Boolean, default: true },
    esSobreTurno: { type: Boolean, require: true },
  },
  {
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = mongoose.model("Turno", TurnoSchema);
