'user strict'

var path = require('path')
var fs = require('fs')
varmongoosePaginate = require('mongoose-pagination')

var Sdr = require('../models/sdr')
var Mpt_ideal = require('../models/mpt_ideal')
var Mpt_patch = require('../models/mpt_patch')
var Mpt_partial = require('../models/mpt_partial')


function getIdeal(req, res){
   let idealId = req.params.idealId

    Mpt_ideal.findById(idealId).populate({path: 'sdr'}).exec(function(err, mptIdeal){
        if(err){
            res.status(500).send({message: `Error al realizar la peticion ${err}`})
        }else{
            if(!mptIdeal){
                res.status(404).send({message: `El MPT IDEAL no existe`})
            }else{
                res.status(200).send({ mptIdeal })
            }
        }
    })
}

function getIdeals(req, res){
    var sdrId = req.params.sdrId

    if(!sdrId){
        // sacar todos los Mpt Ideal de la BBDD
        var find = Mpt_ideal.find({}).sort('state')
    }else{
        // sacar el Mpt Ideal de la BBDD asociado al SDR
        var find = Mpt_ideal.find({ sdr: sdrId })
    }
    find.populate({path: 'sdr'}).exec(function(err, mptIdeals){
        if(err){
            res.status(500).send({message: `Error al realizar la peticion ${err}`})
        }else{
            if(!mptIdeals){
                res.status(404).send({message: `El MPT IDEAL no existe`})
            }else{
                res.status(200).send({ mptIdeals })
            }
        }
    })
}

function saveIdeal(req, res){
    var mptIdeal = new Mpt_ideal();

    var params = req.body;
    mptIdeal.state = params.state
    mptIdeal.date = params.date
    mptIdeal.description = params.description
    mptIdeal.degree_correction = params.degree_correction
    mptIdeal.estimated_cost = params.estimated_cost
    mptIdeal.duration_time = params.duration_time
    mptIdeal.department_involved = params.department_involved
    mptIdeal.responsible = params.responsible
    mptIdeal.advantaje = params.advantaje
    mptIdeal.problems = params.problems
    mptIdeal.file = params.file
    mptIdeal.sdr = params.sdr

    mptIdeal.save(function (err, mptIdealStored){
        if(err){
            res.status(500).send({ message: `Error al guardar MPT ideal ${err}` })
        }else{
            if(!mptIdealStored){
                res.status(404).send({ message: 'No se ha podido guardar el MPT Ideal' })
            }else{
                res.status(200).send({ mptIdeal: mptIdealStored })
            }
        }
    });
}

function updateIdeal(req, res){
    var idealId = req.params.idealId
    var update = req.body

    Mpt_ideal.findByIdAndUpdate(idealId, update, (err, idealUpdated) =>{
        if(err){
            res.status(500).send({ message: `Error al actualizar MPT Ideal ${err}` })
        }else{
            if(!idealUpdated){
                res.status(404).send({ message: 'No se ha podido actualizar el MPT Ideal' })
            }else{
                res.status(200).send({ mptIdeal: idealUpdated })
            }
        }
    })
}

function deleteIdeal(req, res){
    var idealId = req.params.idealId

    Mpt_ideal.findByIdAndRemove(idealId, (err, mptIdealRemoved) =>{
        if (err){
            res.status(500).send({message: `error al eliminar el mpt Ideal en BD ${err} `})
        }else{
            if (!mptIdealRemoved){
                res.status(404).send({message: `error: Nose ha podido eliminar el mpt Ideal`})
            }else{
                res.status(200).send({ mptIdeal: mptIdealRemoved}) 
            } 
        }        
    })
}

function uploadFile(req, res){
    var idealId = req.params.idealId;
    var file_name = 'Archivo no subido...';
    
    if(req.files){
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\')
        var file_name = file_split[2]
    
        var ext_split = file_name.split('\.')
        var file_ext = ext_split[1]
    
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'pdf' || file_ext == 'mp3' || file_ext == 'ogg'
        || file_ext == 'wav' || file_ext == 'avi' || file_ext == '3gp' || file_ext == 'mp4'){
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