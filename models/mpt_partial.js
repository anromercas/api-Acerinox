'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var estado = {
	values: ['BORRADOR','VALIDACION' ,'CREADO', 'APROBADO', 'REALIZADO'],
	message: '{VALUE} NO ES UN ESTADO PERMITIDO'
};

var duracion = {
	values: ['DIAS', 'SEMANAS', 'MESES', 'AÑOS'],
	message: '{VALUE} NO ES UNA DURACION PERMITIDA'
};

var tipo = {
	values: ['CQC', 'INC'],
	message: '{VALUE} NO ES UN TIPO PERMITIDO'
};
var departamentos = {
	values: ['ACERIA', 'LC', 'LF', 'M. MECÁNICO', 'M. ELÉCTRICO', 'SEG-MA', 'TECNICO', 'S. INFO', 'ADMON', 'PERSONAL'],
	message: '{VALUE} NO ES UN DEPARTAMENTO PERMITIDO'
};

const MptPartialShema = Schema({
	name: { type: String, required: [true, 'El nombre es necesario'] },
	state: { type: String, enum: estado },
	type: { type: String, enum: tipo },
	date: { type: Date, required: [true, 'La fecha es necesaria']},
	description: { type: String, required: [true, 'La descripcion es necesaria'] },
	degree_correction: { type: Number, enum: [10, 20, 30, 40], required: [true, 'El grado de correccion es necesario'] },
	estimated_cost: { type: Number, required: [true, 'El coste estimado es necesario'] },
	duration_time: { type: String, enum: duracion },
	department_involved: { type: String, enum: departamentos },
	responsible: { type:Schema.ObjectId, ref: 'User' },
	who_will_do: { type: String, required: [true, 'Quien va a hacer es necesario'] },
	realization_date: { type: Date, required: [true, 'La fecha de realización es necesaria']},
    comments: { type: String, required: false },
    file: { type: String, required: false }
});

module.exports = mongoose.model('MptPartial', MptPartialShema);