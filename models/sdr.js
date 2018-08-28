'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var visibilidad = {
	values: ['MUY ALTA', 'ALTA', 'MEDIA', 'BAJA'],
	message: '{VALUE} NO ES UNA VISIBILIDAD PERMITIDA'
};
var estado = {
	values: ['BORRADOR','VALIDACION' ,'EN CREACION', 'PENDIENTE APROBACION', 'TERMINADO'],
	message: '{VALUE} NO ES UNA ESTADO PERMITIDO'
};

var probabilidad = {
	values: ['MUY ALTA','ALTA' ,'OCASIONAL', 'IRREGULARMENTE', 'RARA', 'REMOTA'],
	message: '{VALUE} NO ES UNA PROBABILIDAD PERMITIDA'
};

var exposicion = {
	values: ['TODA PROBABILIDAD','POSIBLEMENTE' ,'ESCASA', 'MUY RARA', 'NUNCA HA OCURRIDO', 'PRACTICAMENTE IMPOSIBLE'],
	message: '{VALUE} NO ES UNA EXPOSICION PERMITIDA'
};

var gravedad = {
	values: ['CATASTROFE','VARIAS MUERTES' ,'MUERTE', 'LESIONES MUY GRAVES', 'LESIONES CON BAJA', 'HERIDAS LEVES'],
	message: '{VALUE} NO ES UNA GRAVEDAD PERMITIDA'
};

var poblacionRiesgo = {
	values: ['TODA LA PLANTA','1.000 A 2.000' ,'300 A 1.000', '100 A 300', '50 A 100', 'MENOS DE 50'],
	message: '{VALUE} NO ES UNA POBLACION EN RIESGO PERMITIDA'
};

var departamentos = {
	values: ['ACERIA', 'LC', 'LF', 'M. MECÁNICO', 'M. ELÉCTRICO', 'SEG-MA', 'TECNICO', 'S. INFO', 'ADMON', 'PERSONAL'],
	message: '{VALUE} NO ES UN DEPARTAMENTO PERMITIDO'
};

const SdrShema = Schema({
	code: { type: String, required: [true, 'El codigo es necesario'], lowercase: true },
	zone: { type: String, required: [true, 'La zona es necesaria'], lowercase: true },
	group: { type:Schema.ObjectId, ref: 'group', required: false },
	name: { type: String, required: [true, 'El nombre es necesario'], lowercase: true },
	description: { type: String, required: [true, 'La descripcion es necesaria'], lowercase: true },
	probability: { type: String, enum: probabilidad, required: [true, 'La probabilidad es necesaria'] },
	exposition: { type: String, enum: exposicion, required: [true, 'La exposicion es necesaria'] },
	gravity: { type: String, enum: gravedad, required: [true, 'La gravedad es necesaria'] },
	population_at_risk: { type: String, enum: poblacionRiesgo, required: [true, 'La poblacion en riesgo es necesaria'] },
	visibility: { type: String, enum: visibilidad, required: false },
	is_it_concrete: { type: Boolean, required: [true, 'Es concreto es necesario'] },
	created_by: { type:Schema.ObjectId, ref: 'User' },
	state: { type: String, enum: estado},
	cost: { type: Number, required: [true, 'El coste es necesario'] },
	image: { type: String, required: false },
	date: { type: Date, required: [true, 'La fecha es necesaria']},
	department: { type: String, enum: departamentos },
});

module.exports = mongoose.model('Sdr', SdrShema);