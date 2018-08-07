'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MptPartialShema = Schema({
	state: { type: String, enum: ['Borrador', 'Creado', 'Aprobado', 'Realizado']},
	type: String,
	date: Date,
	description: String,
	degree_correction: String,
	estimated_cost: Number,
	duration_time: String,
	departmen_involved: String,
	responsible: { type:Schema.ObjectId, ref: 'User' },
    advantaje_solution: String,
    problems_solution: Number,
    doubts: String,
    sdr: { type:Schema.ObjectId, ref: 'Sdr' }
})

module.exports = mongoose.model('MptPartial', MptPartialShema);