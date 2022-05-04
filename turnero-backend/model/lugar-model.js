const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LugarSchema = Schema(
  {
    activo: { type: Boolean, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = LugarSchema;
