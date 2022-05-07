const timespan = require("jsonwebtoken/lib/timespan");
const mongoose = require("mongoose");
const { appConfig } = require("../config");
const Schema = mongoose.Schema;

const DisponibilidadUsuario = Schema (
    {  
        user: {type: String},
        disponibilidades: [{
            horaInicio: {type: timespan},
            horaFin: {type: timespan},
            diaDeSemana: {type: String},
            duracion: {type: timespan},
            lugar: {type: String}
        }]
}
)

module.exports = mongoose.model(DisponibilidadUsuario);

