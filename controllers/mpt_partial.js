'user strict'

var path = require('path')
var fs = require('fs')
var mongoosePaginate = require('mongoose-pagination')

var Sdr = require('../models/sdr')
var Mpt_ideal = require('../models/mpt_ideal')
var Mpt_patch = require('../models/mpt_patch')
var Mpt_partial = require('../models/mpt_partial')


function getPartial(req, res){
   let partialId = req.params.partialId

   Mpt_partial.findById(partialId).populate({path: 'sdr'}).exec(function(err, mptPartial){
        if(err){
            res.status(500).send({message: `Error al realizar la peticion ${err}`})
        }else{
            if(!mptPartial){
                res.status(404).send({message: `El MPT PARCIAL no existe`})
            }else{
                res.status(200).send({ mptPartial })
            }
        }
    })
}

function getPartials(req, res){
    var sdrId = req.params.sdrId

    if(!sdrId){
        // sacar todos los Mpt Ideal de la BBDD
        var find = Mpt_partial.find({}).sort('state')
    }else{
        // sacar el Mpt Ideal de la BBDD asociado al SDR
        var find = Mpt_partial.find({ sdr: sdrId })
    }
    find.populate({path: 'sdr'}).exec(function(err, mptPartials){
        if(err){
            res.status(500).send({message: `Error al realizar la peticion ${err}`})
        }else{
            if(!mptPartials){
                res.status(404).send({message: `El MPT PARCIAL no existe`})
            }else{
                res.status(200).send({ mptPartials })
            }
        }
    })
}

function savePartial(req, res){
    var mptPartial = new Mpt_partial();

    var params = req.body;
    mptPartial.state = params.state
    mptPartial.date = params.date
    mptPartial.description = params.description
    mptPartial.degree_correction = params.degree_correction
    mptPartial.estimated_cost = params.estimated_cost
    mptPartial.duration_time = params.duration_time
    mptPartial.department_involved = params.department_involved
    mptPartial.responsible = params.responsible
    mptPartial.who_will_do = params.who_will_do
    mptPartial.realization_date = params.realization_date
    mptPartial.comments = params.comments
    mptPartial.file = params.file
    mptPartial.sdr = params.sdr

    Mpt_partial.save(function (err, mptPartialStored){
        if(err){
            res.status(500).send({ message: `Error al guardar MPT ideal ${err}` })
        }else{
            if(!mptPartialStored){
                res.status(404).send({ message: 'No se ha podido guardar el MPT Ideal' })
            }else{
                res.status(200).send({ mptPartial: mptPartialStored })
            }
        }
    });
}

function updatePartial(req, res){
    var partialId = req.params.partialId
    var update = req.body

    Mpt_partial.findByIdAndUpdate(partialId, update, (err, partialUpdated) =>{
        if(err){
            res.status(500).send({ message: `Error al actualizar MPT Ideal ${err}` })
        }else{
            if(!patchUpdated){
                res.status(404).send({ message: 'No se ha podido actualizar el MPT Ideal' })
            }else{
                res.status(200).send({ mptPartial: patchUpdated })
            }
        }
    })
}

function deletePartial(req, res){
    var partialId = req.params.partialId

    Mpt_partial.findByIdAndRemove(partialId, (err, mptPaartialRemoved) =>{
        if (err){
            res.status(500).send({message: `error al eliminar el mpt Ideal en BD ${err} `})
        }else{
            if (!mptPaartialRemoved){
                res.status(404).send({message: `error: Nose ha podido eliminar el mpt Ideal`})
            }else{
                res.status(200).send({ mptPatch: mptPaartialRemoved}) 
            } 
        }        
    })
}

function uploadFile(req, res){
    var partialId = req.params.partialId
    var file_name = 'Archivo no subido...';
    
    if(req.files){
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\')
        var file_name = file_split[2]
    
        var ext_split = file_name.split('\.')
        var file_ext = ext_split[1]
    
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'pdf' || file_ext == 'mp3' || file_ext == 'ogg'
        || file_ext == 'wav' || file_ext == 'avi' || file_ext == '3gp' || file_ext == 'mp4'){
            Mpt_partial.findByIdAndUpdate(partialId, {file: file_name}, (err, partialUpdated) =>{
                if (!partialUpdated){
                    res.status(404).send({message: `error: Nose ha podido actualizar el archivo`})
                }else{
                    res.status(200).send({ mptPatch: partialUpdated})
                }
            });
        }else{
            res.status(200).send({ message: 'Extensión de archivo no válida'})
        }
    }else{
        res.status(200).send({ message: 'No has subido ningun archivo'})
    }
}

function getFile(req, res){
    var file = req.params.file
    var path_file = './uploads/mpt_paartial/'+ file

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file))
        }else{
            res.status(200).send({ message: 'No existe el archivo'})
        }
    })
}

module.exports = {
    getPartial,
    savePartial,
    getPartials,
    updatePartial,
    deletePartial,
    uploadFile,
    getFile
}