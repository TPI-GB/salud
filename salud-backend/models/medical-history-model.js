const mongoose = require("mongoose");
const medicalConsultationSchema = require("./medical-consultation-model");
const medicalTestSchema = require("./medical-test-model");

const Schema = mongoose.Schema;

const MedicalHistorySchema = Schema(
  {
    numeroHistoriaClinica: { type: String, required: true },
<<<<<<< HEAD
=======
    tipoDocumento: { type: String, required: true },
    numeroDocumento: { type: String, required: true },
>>>>>>> 64fcbae0e1fb15b45d2fe3c06364b502925db308
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

<<<<<<< HEAD
=======
MedicalHistorySchema.index(
  { tipoDocumento: 1, numeroDocumento: -1 },
  { unique: true }
);

>>>>>>> 64fcbae0e1fb15b45d2fe3c06364b502925db308
module.exports = mongoose.model("MedicalHistory", MedicalHistorySchema);
