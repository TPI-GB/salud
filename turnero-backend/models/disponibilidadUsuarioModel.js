const timespan = require("jsonwebtoken/lib/timespan");
const mongoose = require("mongoose");
const { appConfig } = require("../config");
const LugarSchema = require("./lugar-model");
const Schema = mongoose.Schema;

const DisponibilidadUsuario = Schema (
    {  
        user: {type: String},
        disponibilidades: [{
            horaInicio: {type: String},
            horaFin: {type: String},
            diaDeSemana: {type: String},
            duracion: {type: String},
            lugar: {type: String}
        }]
}
)

module.exports = mongoose.model("DisponibilidadUsuario", DisponibilidadUsuario);

