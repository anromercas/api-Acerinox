'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estado = {
	values: ['BORRADOR','VALIDACION' ,'CREADO', 'APROBADO', 'REALIZADO'],
	message: '{VALUE} NO ES UNA ESTADO PERMITIDO'
};
var duracion = {
	values: ['DIAS', 'SEMANAS', 'MESES', 'AÑOS', 'SIEMPRE'],
	message: '{VALUE} NO ES UNA DURACION PERMITIDA'
};
var departamentos = {
	values: ['ACERIA', 'LC', 'LF', 'M. MECÁNICO', 'M. ELÉCTRICO', 'SEG-MA', 'TECNICO', 'S. INFO', 'ADMON', 'PERSONAL'],
	message: '{VALUE} NO ES UN DEPARTAMENTO PERMITIDO'
};

const MptIdealShema = Schema({
	name: { type: String, required: [true, 'El nombre es necesario'] },
	state: { type: String, enum: estado },
	date: { type: Date, required: [true, 'La fecha es necesaria']},
	description: { type: String,  required: [true, 'La descripcion es necesaria'] },
	degree_correction: { type: Number, default: 100, required: [true, 'El grado de correccion es necesario'] },
	estimated_cost: { type: Number, required: [true, 'El coste estimado es necesario'] },
	duration_time: { type: String, enum: duracion},
	department_involved: { type: String, enum: departamentos, required: [true, 'El departamento es obligatorio'] },
	responsible: { type:Schema.ObjectId, ref: 'User' },
    advantaje: { type: String, required: [true, 'La ventajas son necesarias'] },
	problems: { type: String, required: [true, 'Los problemas son necesarios'] },
	file: { type: String, required: false }
});

module.exports = mongoose.model('MptIdeal', MptIdealShema);