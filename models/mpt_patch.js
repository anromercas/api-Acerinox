'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MptPatchShema = Schema({
	state: { type: String, enum: ['Borrador', 'Creado', 'Aprobado', 'Realizado']},
	date: Date,
	description: String,
	degree_correction: String,
	estimated_cost: Number,
	duration_time: { type: String, enum: ['Dias', 'Semanas', 'Meses', 'Años', 'Siempre']},
	departmen_involved: String,
	responsible: { type:Schema.ObjectId, ref: 'User' },
    who_will_do: String,
    realization_date: Date,
    comments: String,
	sdr: { type:Schema.ObjectId, ref: 'Sdr' },
	file: String
})

module.exports = mongoose.model('MptPatch', MptPatchShema);