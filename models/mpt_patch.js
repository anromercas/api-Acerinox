'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var estado = {
	values: ['BORRADOR','VALIDACION' ,'CREADO', 'APROBADO', 'REALIZADO'],
	message: '{VALUE} NO ES UN ESTADO PERMITIDO'
};

var duracion = {
	values: ['DIAS', 'SEMANAS', 'MESES', 'AÑOS', 'SIEMPRE'],
	message: '{VALUE} NO ES UNA DURACION PERMITIDA'
};
var departamentos = {
	values: ['ACERIA', 'LC', 'LF', 'M. MECÁNICO', 'M. ELÉCTRICO', 'SEG-MA', 'TECNICO', 'S. INFO', 'ADMON', 'PERSONAL'],
	message: '{VALUE} NO ES UN DEPARTAMENTO PERMITIDO'
};

const MptPatchShema = Schema({
	name: { type: String, required: [true, 'El nombre es necesario'] },
	state: { type: String, enum:estado },
	date: { type: Date, required: [true, 'La fecha es necesaria']},
	description: { type: String, required: [true, 'La descripcion es necesaria'] },
	degree_correction: { type: Number, required: [true, 'El grado de correccion es necesario'] },
	estimated_cost: { type: Number, required: [true, 'El coste estimado es necesario'] },
	duration_time: { type: String, enum: duracion},
	departmen_involved: { type: String, enum: departamentos },
	responsible: { type:Schema.ObjectId, ref: 'User', required: [true, 'El responsable es necesario'] },
    who_will_do: { type: String, required: [true, 'Quien va a hacer es necesario'] },
    realization_date: { type: Date, required: [true, 'La fecha es necesaria']},
    comments: { type: String, required: false },
	file: { type: String, required: false }
});

module.exports = mongoose.model('MptPatch', MptPatchShema);