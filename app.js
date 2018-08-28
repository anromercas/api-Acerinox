'use strict'

// configuracion de express
const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();

// cargar rutas
var user_routes = require('./routes/user');
var sdr_routes = require('./routes/sdr');
var ideal_routes = require('./routes/mpt_ideal');
var patch_routes = require('./routes/mpt_patch');
var partial_routes = require('./routes/mpt_partial');
var search_routes = require('./routes/search');

//middlewares. 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas base
app.use('/api', user_routes);
app.use('/api', sdr_routes);
app.use('/api', ideal_routes);
app.use('/api', patch_routes);
app.use('/api', partial_routes);
app.use('/api', search_routes);



// exportar
module.exports = app;