const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MedicalConsultationSchema = Schema(
  {
    motivo: { type: String, required: true },
    doctor: { type: String, required: true },
    archivos: { type: Array },
    textoLibre: { type: String },
  },
  {
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = MedicalConsultationSchema;
