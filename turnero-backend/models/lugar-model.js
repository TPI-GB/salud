const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LugarSchema = Schema(
  {
    activo: { type: Boolean, require: true },
    nombre: { type: String, require: true },
    descripcion: { type: String, require: true },
    direccion: { type: String, require: true },
    telefono: { type: Number, require: true },
  },
  {
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = mongoose.model("Lugar", LugarSchema);
