'use strict'

const User = require ('../models/user')
const mongoose = require('mongoose')
const service = require('../services/user')

function getUser(req, res){
	let userId = req.params.userId

    User.findById(userId, (err, user) =>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!user) return res.status(404).send({message: `El usuario no existe`})
        res.status(200).send({ user: user})
    })
}

function getUsers(req, res){
	User.find({}, (err, users) =>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!users) return res.status(404).send({message: `Los usuarios no existen`})
        res.status(200).send({users})
    })   
}

function saveUser(req, res){
	console.log('POST /api/user')
    console.log(req.body)

    let user = new User()
    user.name = req.body.name
    user.surname = req.body.surname
    user.secondsurname = req.body.secondsurname
    user.email = req.body.email
    user.password = req.body.password
    user.role = req.body.role

    user.save((err, userStored) =>{
        if(err) res.status(500).send({message: `error al guardar el usuario en BD ${err} `})

        res.status(200).send({user: userStored})
    })
}

function updateUser(req, res){
	let userId = req.params.userId
    let update = req.body

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) err.status(500).send({message: `error al actualizar el usuario en BD ${err} `})
        res.status(200).send({ user: userUpdated})
    })
}

function deleteUser(req, res){
	let userId = req.params.userId
    
    User.findById(userId, (err, user) => {
        if (err) err.status(500).send({message: `error al borrar el usuario en BD ${err} `})
        user.remove(err => {
            if (err) err.status(500).send({message: `error al borrar el usuario en BD ${err} `})
            res.status(200).send({ message: 'el usuario ha sido eliminado'})
        })
        
    })
}

function signUp(req, res){
    const user = new User({
 //       name: req.body.name,
 //       surname: req.body.surname,
 //       secondsurname: req.body.secondsurname,
        email: req.body.email,
        password: req.body.password
    })

    user.save((err) => {
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}`})

        return res.status(200).send({ token: service.createToken(user) })
    })
}

function signIn(req, res){

	User.find({ email: req.body.email }, (err, user) => {
		if(err) return res.status(500).send({ message: err })
		if(!User) return res.status(404).sedn({ message: 'No existe el usuario' })

		req.user = user
		res.status(200).send({
			message: 'Te has logueado correctamente',
			token: service.createToken(user)
		})
	})
}

function privateUser(req, res){

}

module.exports = {
	getUser,
	getUsers,
	saveUser,
	updateUser,
	deleteUser,
	signIn,
	signUp,
	privateUser
}