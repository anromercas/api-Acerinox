'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserShema = Schema({
	name: String,
	surname: String,
	secondsurname: String,
	avatar: String,
	email: { type: String, unique: true, lowercase: true },
	password: { type: String, select: false },
	singupDate: { type: Date, default: Date.now() },
	lastLogin: Date,
	role: { type: String, enum: ['lider', 'supervisor']}
})

UserShema.pre('save', (next) => {
	let user = this
	if(!user.isModified('password')) return next()

	bcrypt.genSalt(10, (err, salt) => {
		if(err) return next()
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if(err) return next()
			user.password = hash
			next()
		})
	})
})

UserShema.methods.gravatar = function() {
	if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

	const md5 = crypto.createHash('md5').update(this.email).digest('hex')
	return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserShema);
//projects --> guarda los documents en la coleccion