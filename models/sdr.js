'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SdrShema = Schema({
	code: String,
	zone: String,
	group: String,
	description: String,
	probability: Number,
	exposition: String,
	gravity: String,
	population_at_risk: Number,
	visibility: String,
	state: { type: String, enum: ['Borrador', 'En Creacion', 'Pendiente Aprobacion', 'Terminado', 'Parcheado', 'Parcializado']},
	cost: Number,
	image: String
})

module.exports = mongoose.model('Sdr', SdrShema);