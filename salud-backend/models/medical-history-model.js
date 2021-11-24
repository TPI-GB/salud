const mongoose = require("mongoose");
const medicalConsultationSchema = require("./medical-consultation-model");
const medicalTestSchema = require("./medical-test-model");

const Schema = mongoose.Schema;

const MedicalHistorySchema = Schema(
  {
    numeroHistoriaClinica: { type: String, required: true },
    nombres: { type: String },
    apellidos: { type: String },
    nacionalidad: { type: String },
    sexo: { type: String },
    edad: { type: Number },
    ocupacionActual: { type: String },
    estadoCivil: { type: String },
    domicilioActual: { type: String },
    raza: { type: String },
    consultas: [medicalConsultationSchema],
    estudios: [medicalTestSchema],
  },
  {
    collection: "medicalHistories",
  },
  {
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = mongoose.model("MedicalHistory", MedicalHistorySchema);
