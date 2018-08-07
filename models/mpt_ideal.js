'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MptIdealShema = Schema({
	state: { type: String, enum: ['Borrador', 'Creado', 'Aprobado', 'Realizado']},
	date: Date,
	description: String,
	degree_correction: Number,
	estimated_cost: Number,
	duration_time: { type: String, enum: ['Dias', 'Semanas', 'Meses', 'Años', 'Siempre']},
	departmen_involved: String,
	responsible: { type:Schema.ObjectId, ref: 'User' },
    advantaje: String,
	problems: String,
	file: String,
    sdr: { type:Schema.ObjectId, ref: 'Sdr' }
})

module.exports = mongoose.model('MptIdeal', MptIdealShema);