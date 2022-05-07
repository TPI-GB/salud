const mongoose = require("mongoose");
const Lugar = require("./lugar-model");

const Schema = mongoose.Schema;

const TurnoSchema = Schema(
  {
<<<<<<<< HEAD:turnero-backend/models/turno_model.js
    fecha: { type: Date, required: true },
    lugar: { type: String, required: true },
========
    fecha: { type: Date, require: true },
    lugar: { type: Lugar, require: true },
>>>>>>>> f5a33b55ccb9087dc6fb7faa409e981aca83029d:turnero-backend/models/turno-model.js
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
