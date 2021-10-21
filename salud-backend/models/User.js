const mongoose = require("mongoose");
const { appConfig } = require("../config");

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    nombre: String,
    apellido: String,
    nick: { type: String, unique: true },
    roles: { type: Array, default: [] },
    contrasenia: { type: String, required: true },
    mail: { type: String, required: true },
    activo: { type: Boolean, required: true, default: true },
    tipodocumento: { type: String, required: true },
    numerodocumento: { type: String, required: true },
    debecambiarcontrasenia: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ tipodocumento: 1, numerodocumento: -1 }, { unique: true });
module.exports = mongoose.model("Users", UserSchema);
