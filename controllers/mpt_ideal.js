'user strict'

var path = require('path')
var fs = require('fs')
varmongoosePaginate = require('mongoose-pagination')

var Sdr = require('../models/sdr')
var Mpt_ideal = require('../models/mpt_ideal')
var Mpt_patch = require('../models/mpt_patch')
var Mpt_partial = require('../models/mpt_partial')


function getMptIdeal(req, res){
    let idealId = req.params.idealId

    Mpt_ideal.findById(idealId, (err, mpt_ideal) =>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!mpt_ideal) return res.status(404).send({message: `El MPT IDEAL no existe`})
        res.status(200).send({ mpt_ideal: mpt_ideal })
    })
}

module.exports = {
    getMptIdeal
}