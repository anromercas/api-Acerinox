'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MptPatchShema = Schema({
	type: String,
	date: Date,
	description: String,
	degree_correction: String,
	estimated_cost: Number,
	duration_time: String,
	departmen_involved: String,
	responsible: { type:Schema.ObjectId, ref: 'User' },
    who_will_do: String,
    realization_date: Number,
    comments: String,
    sdr: { type:Schema.ObjectId, ref: 'Sdr' }
})

module.exports = mongoose.model('MptPatch', MptPatchShema);