'use strict'

var User = require('../models/user');
var Sdr = require('../models/sdr');
var Ideal = require('../models/mpt_ideal');
var Partial = require('../models/mpt_partial');
var Patch = require('../models/mpt_patch');

var mongoose = require('mongoose');
var serviceUser = require('../services/user');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');


// ==============================
// Busqueda por coleccion
// ==============================

function searchCollection( req, res) {
    var busqueda = req.params.search;
    var tabla = req.params.table;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch ( tabla ){
        
        case 'users':
            promesa = buscarUsuarios(busqueda, regex);
        break;

        case 'sdrs':
            promesa = buscarSdrs(busqueda, regex);
        break;

        default:
            return res.status(400).json({
                mensaje: 'Los tipos de busqueda sólo son: usuarios y sdrs',
                error: { message: 'Tipo de tabla/colección no válido'}
            });
    }

    promesa.then( data => {
        res.status(200).json({
           [tabla]: data
        });
    });
}




// ==============================
// Busqueda general
// ==============================
function searchAll(req, res) {

    var busqueda = req.params.search;
    //expresión regular para que la busqueda sea insensible a mayusculas y minusculas
    var regex = new RegExp(busqueda, 'i');

    // promesa para buscar simultaneamente en diferentes partes de la BD
    Promise.all( [ 
        buscarSdrs(busqueda, regex), 
        buscarUsuarios(busqueda, regex) ])
        .then( respuestas => {
            res.status(200).json({ 
                sdrs: respuestas[0],
                users: respuestas[1]
            });
        });

  
}

function buscarSdrs ( busqueda, regex ) {

    return new Promise( (resolve, reject) => {
        Sdr.find({description: regex }, (err, sdrs) => {
            if ( err ) {
                reject('error al cargar hospitales', err);
            }else{
                resolve(sdrs);
            }
        });
    });
}

function buscarUsuarios ( busqueda, regex ) {

    return new Promise( (resolve, reject) => {
        User.find({}, 'nombre surname secondsurname email')
        .or( [ { 'name': regex }, {'surname': regex}, {'secondsurname': regex}, {'email': regex}, ])
        .exec( (err, users) => {
            if (err) {
                reject('Error al cargar los usuarios', err);
            }else{
                resolve(users);
            }
        });
    });
}

module.exports = {
    searchAll,
    searchCollection
};