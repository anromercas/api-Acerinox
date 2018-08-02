'use strict'

// configuracion de express
const express = require ('express')
const bodyParser = require ('body-parser')
const app = express()
const api = require('./routes/user')

//middlewares. 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api', api)

// exportar
module.exports = app