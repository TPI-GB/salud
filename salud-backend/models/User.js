const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    nombre: {type: String, default: "John"},
    apellido: {type: String, default: "Doe"},
    nick: { type: String, unique: true },
    roles: { type: Array, default: "" },
    contrasenia: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    activo: { type: Boolean, required: true, default: true },
    tipodocumento: { type: String, required: true },
    numerodocumento: { type: String, required: true },
    debecambiarcontrasenia: { type: Boolean, default: false },
    token: { type: String }
  },
  { 
    collection: 'users' 
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ tipodocumento: 1, numerodocumento: -1 }, { unique: true });
module.exports = mongoose.model("Users", UserSchema);
