const timespan = require("jsonwebtoken/lib/timespan");
const mongoose = require("mongoose");
const { appConfig } = require("../config");
const Schema = mongoose.Schema;

const DisponibilidadMedicaSchema = Schema (
    {
        horaInicio: {type: timespan},
        horaFin: {type: timespan},
        duracion: {type: timespan}
    }
)

module.exports = mongoose.model(DisponibilidadMedicaSchema);

