'use strict'

const User = require ('../models/user')
const mongoose = require('mongoose')
const serviceUser = require('../services/user')
const bcrypt = require('bcrypt-nodejs')
const fs = require('fs')
const path = require('path')


function pruebas(req, res){
    res.status(200).send({message: 'Probando una accion del controlador de usuario del api rest'})
}

function saveUser(req, res){
	console.log('POST /api/user')
    console.log(req.body)

    var params = req.body
    var user = new User()
    
    user.name = params.name
    user.surname = params.surname
    user.secondsurname = params.secondsurname
    user.email = params.email
    user.password = params.password
    user.role = params.role,
    user.image = null

    if(params.password){
        // Encriptar contraseña
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;  
            if(user.name != null && user.surname != null && user.email != null){
                // Guardar usuario
                user.save(function (err, userStored) {
                    if(err) res.status(500).send({message: `Error al guardar el usuario ${err}`})
                    if(!userStored) res.status(404).send({message: 'No se ha registrado el usuario'})
                    res.status(200).send({user: userStored})
                });
            }else{
                res.status(200).send({message: 'Introduce todos los campos'})
            }
        });
    }else{
        res.status(200).send({message: 'Introduce la contraseña'})
    }
}

function loginUser(req, res){
    var params = req.body;
    
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'})
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no existe'});
            }else{
                //comprobar la contraseña
                bcrypt.compare(password, user.password, (err, check) =>{
                    if(check){
                        //devolver los datos del usuario logueado
                        if(params.gethash){
                            //devolver un token de jwt
                            res.status(200).send({
                                token: serviceUser.createToken(user)
                            })
                        }else{
                            res.status(200).send({user});
                        }  
                    }else{
                        res.status(404).send({message: `El usuario no ha podido loguearse ${err} ${check}`});
                    }
                });
            }
        }
    });

}

function updateUser(req, res){
	let userId = req.params.userId
    let update = req.body

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) res.status(500).send({message: `error al actualizar el usuario en BD ${err} `})
        if (!userUpdated) res.status(404).send({message: `error: Nose ha podido actualizar el usuario`})
        res.status(200).send({ user: userUpdated})
    })
}

function uploadImage(req,res){
    var userId = req.params.userId;
    var file_name = 'Imagen no subida...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\')
        var file_name = file_split[2]

        var ext_split = file_name.split('\.')
        var file_ext = ext_split[1]

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) =>{
                if (!userUpdated){
                    res.status(404).send({message: `error: Nose ha podido actualizar el usuario`})
                }else{
                    res.status(200).send({ user: userUpdated})
                }
            });
        }else{
            res.status(200).send({ message: 'Extensión de archivo no válida'})
        }

        console.log(file_split)
    }else{
        res.status(200).send({ message: 'No has subido ninguna imagen'})
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile
    var path_file = './uploads/users/'+ imageFile

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file))
        }else{
            res.status(200).send({ message: 'No existe la imagen'})
        }
    })
}

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

function deleteUser(req, res){
	let userId = req.params.userId
    
    User.findById(userId, (err, user) => {
        if (err) res.status(500).send({message: `error al borrar el usuario en BD ${err} `})
        user.remove(err => {
            if (err) res.status(500).send({message: `error al borrar el usuario en BD ${err} `})
            res.status(200).send({ message: 'el usuario ha sido eliminado'})
        })
        
    })
}

function privateUser(req, res){

}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    uploadImage,
    getImageFile,
    getUser,
	getUsers,
	updateUser,
	deleteUser,
	privateUser
}