'use strict'

var mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if(err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexion a la base de datos establecida...')

    app.listen(config.port, () => {
        console.log(`API REST corriendo en la url: localhost:${config.port}`);
    })

})














/*

//CONEXION A BD MONGODB
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/acerinox')
		.then(() => {
			console.log("Conexión a la base de datos establecida con éxito...");

			// Creación del servidor
			app.listen(port, () => {
				console.log(`API REST corriendo en la url: localhost:${port}`);
			});
		})
        .catch(err => console.log(err));
        
        */