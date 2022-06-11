const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TurnoSchema = Schema(
  {
    fecha: { type: Date, required: true },
    lugar: { type: String, required: true },
    horaInicio: { type: Number, require: true },
    minutoInicio: { type: Number, require: true },
    medico: { type: String },
    paciente: { type: Object, default: {nombre: "", apellido: "", obraSocial: "", dni: "", telefono: ""} }, 
    disponible: { type: Boolean, default: true },
    anulado: { type: Boolean, default: false },
    esSobreTurno: { type: Boolean, default: false },
    lugar: { type: String },
  },
  {
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = mongoose.model("Turno", TurnoSchema);
