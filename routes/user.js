'use strict'

const express = require('express');
const UserCtrl = require ('../controllers/user')
const api = express.Router();
const auth = require ('../middlewares/auth')

//rutas
api.get('/user', UserCtrl.getUsers)
api.get('/user/:userId', UserCtrl.getUser)
api.post('/user', UserCtrl.saveUser)
api.put('/user/:userId', UserCtrl.updateUser)
api.delete('/user/:userId', UserCtrl.deleteUser) 
api.get('/private', auth, UserCtrl.privateUser)

module.exports = api;