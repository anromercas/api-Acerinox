'use strict'

const express = require('express');
const UserCtrl = require ('../controllers/user')
const api = express.Router();
const auth = require ('../middlewares/auth')

//rutas
api.get('/user', auth, UserCtrl.getUsers)
api.get('/user/:userId', UserCtrl.getUser)
api.post('/user', auth, UserCtrl.saveUser)
api.put('/user/:userId', auth, UserCtrl.updateUser)
api.delete('/user/:userId', auth, UserCtrl.deleteUser) 
api.post('/singup', UserCtrl.signUp)
api.post('/singin', UserCtrl.signIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api;