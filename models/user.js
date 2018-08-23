'use strict'

const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator') ;
const Schema = mongoose.Schema;

var rolesValidos = {
	values: ['LIDER', 'SUPERVISOR', 'DIRECTOR', 'ADMIN'],
	message: '{VALUE} NO ES UN ROL PERMITIDO'
};

const UserShema = Schema({
	name: { type: String, required: [true, 'El nombre es necesario'], lowercase: true },
	surname: { type: String, required: [true, 'El primer apellido es necesario'], lowercase: true },
	secondsurname: { type: String, required: [true, 'El segundo apellido es necesario'], lowercase: true },
	email: { type: String, required: [true, 'El email es necesario'], unique: true, lowercase: true },
	password: { type: String, required: [true, 'El nombre es necesario'], lowercase: true },
	image: { type: String, required: false },
	role: { type: String, enum: rolesValidos, default: 'LIDER'}
});

UserShema.plugin(uniqueValidator, { message: ' El {PATH} debe ser único'});

module.exports = mongoose.model('User', UserShema);
