const timespan = require("jsonwebtoken/lib/timespan");
const mongoose = require("mongoose");
const { appConfig } = require("../config");
const LugarSchema = require("./lugar-model");
const Schema = mongoose.Schema;

const DisponibilidadUsuario = Schema({
  user: { type: String, unique: true },
  disponibilidades: [
    {
      horaInicio: { type: Number },
      minutoInicio: { type: Number },
      horaFin: { type: Number },
      minutoFin: { type: Number },
      diaDeSemana: { type: String },
      duracion: { type: Number },
      lugar: { type: String },
    },
  ],
});

module.exports = mongoose.model("DisponibilidadUsuario", DisponibilidadUsuario);
