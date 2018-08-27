'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupShema = Schema({
    name: { type: String, required: [true, 'El nombre es necesario'], lowercase: true },
    dealer: { type:Schema.ObjectId, ref: 'User', required: [true, 'El lider es necesario'], lowercase: true },
    participants: { type:Schema.ObjectId, ref: 'User', required: [true, 'Los participantes son necesarios'], lowercase: true },
});

module.exports = mongoose.model('group', groupShema);