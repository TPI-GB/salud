const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeriadoSchema = Schema(
    {
      fecha: Date,
      description: String,
    },
    {
        timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" }
    }
  );
  
  module.exports = mongoose.model("Feriado", FeriadoSchema);