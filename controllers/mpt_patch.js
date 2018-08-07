'user strict'

var path = require('path')
var fs = require('fs')
varmongoosePaginate = require('mongoose-pagination')

var Sdr = require('../models/sdr')
var Mpt_ideal = require('../models/mpt_ideal')
var Mpt_patch = require('../models/mpt_patch')
var Mpt_partial = require('../models/mpt_partial')


function getPatch(req, res){
   let patchId = req.params.patchId

   Mpt_patch.findById(patchId).populate({path: 'sdr'}).exec(function(err, mptPatch){
        if(err){
            res.status(500).send({message: `Error al realizar la peticion ${err}`})
        }else{
            if(!mptPatch){
                res.status(404).send({message: `El MPT PARCHE no existe`})
            }else{
                res.status(200).send({ mptPatch })
            }
        }
    })
}

function getPatchs(req, res){
    var sdrId = req.params.sdrId

    if(!sdrId){
        // sacar todos los Mpt Ideal de la BBDD
        var find = Mpt_patch.find({}).sort('state')
    }else{
        // sacar el Mpt Ideal de la BBDD asociado al SDR
        var find = Mpt_patch.find({ sdr: sdrId })
    }
    find.populate({path: 'sdr'}).exec(function(err, mptPatchs){
        if(err){
            res.status(500).send({message: `Error al realizar la peticion ${err}`})
        }else{
            if(!mptPatchs){
                res.status(404).send({message: `El MPT IDEAL no existe`})
            }else{
                res.status(200).send({ mptPatchs })
            }
        }
    })
}

function savePatch(req, res){
    var mptPatch = new Mpt_patch();

    var params = req.body;
    mptPatch.state = params.state
    mptPatch.date = params.date
    mptPatch.description = params.description
    mptPatch.degree_correction = params.degree_correction
    mptPatch.estimated_cost = params.estimated_cost
    mptPatch.duration_time = params.duration_time
    mptPatch.department_involved = params.department_involved
    mptPatch.responsible = params.responsible
    mptPatch.who_will_do = params.who_will_do
    mptPatch.realization_date = params.realization_date
    mptPatch.comments = params.comments
    mptPatch.file = params.file
    mptPatch.sdr = params.sdr

    mptPatch.save(function (err, mptPatchStored){
        if(err){
            res.status(500).send({ message: `Error al guardar MPT ideal ${err}` })
        }else{
            if(!mptPatchStored){
                res.status(404).send({ message: 'No se ha podido guardar el MPT Ideal' })
            }else{
                res.status(200).send({ mptPatch: mptPatchStored })
            }
        }
    });
}

function updatePatch(req, res){
    var patchId = req.params.patchId
    var update = req.body

    Mpt_patch.findByIdAndUpdate(patchId, update, (err, patchUpdated) =>{
        if(err){
            res.status(500).send({ message: `Error al actualizar MPT Ideal ${err}` })
        }else{
            if(!patchUpdated){
                res.status(404).send({ message: 'No se ha podido actualizar el MPT Ideal' })
            }else{
                res.status(200).send({ mptPatch: patchUpdated })
            }
        }
    })
}

function deletePatch(req, res){
    var patchId = req.params.patchId

    Mpt_patch.findByIdAndRemove(patchId, (err, mptPatchRemoved) =>{
        if (err){
            res.status(500).send({message: `error al eliminar el mpt Ideal en BD ${err} `})
        }else{
            if (!mptPatchRemoved){
                res.status(404).send({message: `error: Nose ha podido eliminar el mpt Ideal`})
            }else{
                res.status(200).send({ mptPatch: mptPatchRemoved}) 
            } 
        }        
    })
}

function uploadFile(req, res){
    var patchId = req.params.patchId;
    var file_name = 'Archivo no subido...';
    
    if(req.files){
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\')
        var file_name = file_split[2]
    
        var ext_split = file_name.split('\.')
        var file_ext = ext_split[1]
    
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'pdf'){
            Mpt_ideal.findByIdAndUpdate(idealId, {file: file_name}, (err, idealUpdated) =>{
                if (!idealUpdated){
                    res.status(404).send({message: `error: Nose ha podido actualizar el archivo`})
                }else{
                    res.status(200).send({ mptIdeal: idealUpdated})
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
    var path_file = './uploads/mpt_ideal/'+ file

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file))
        }else{
            res.status(200).send({ message: 'No existe el archivo'})
        }
    })
}

module.exports = {
    getIdeal,
    saveIdeal,
    getIdeals,
    updateIdeal,
    deleteIdeal,
    uploadFile,
    getFile
}