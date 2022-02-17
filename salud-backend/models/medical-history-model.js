const mongoose = require("mongoose");
const medicalConsultationSchema = require("./medical-consultation-model");
const medicalTestSchema = require("./medical-test-model");

const Schema = mongoose.Schema;

const MedicalHistorySchema = Schema(
  {
    numeroHistoriaClinica: { type: String, required: true, unique: true },
    tipoDocumento: { type: String, required: true },
    numeroDocumento: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    paisDeNacimiento: { type: String, required: true },
    sexo: { type: String },
    edad: { type: Number },
    ocupacionActual: { type: String },
    estadoCivil: { type: String },
    domicilioActual: { type: String },
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
