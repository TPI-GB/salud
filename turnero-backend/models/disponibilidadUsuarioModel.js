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
      diaDeSemana: { type: Number }, // 0: Domingo, 1: Lunes, 2: Martes, 3: Miercoles, 4: Jueves, 5: Viernes, 6: Sabado.
      duracion: { type: Number },
      lugar: { type: String },
    },
  ],
});

module.exports = mongoose.model("DisponibilidadUsuario", DisponibilidadUsuario);
