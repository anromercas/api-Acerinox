'user strict'

var path = require('path')
var fs = require('fs')
varmongoosePaginate = require('mongoose-pagination')

var Sdr = require('../models/sdr')
var Mpt_ideal = require('../models/mpt_ideal')
var Mpt_patch = require('../models/mpt_patch')
var Mpt_partial = require('../models/mpt_partial')


function getSdr(req, res){
    let sdrId = req.params.sdrId

    Sdr.findById(sdrId, (err, sdr) =>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!sdr) return res.status(404).send({message: `El SDR no existe`})
        res.status(200).send({ sdr: sdr })
    })
}

function getSdrs(req, res){
    if(req.params.page){
        var page = req.params.page
    }else{
        page = 1
    }
    var itemsPerPage = 10

    Sdr.find().sort('code').paginate(page, itemsPerPage, function(err, sdrs, total){
        if(err) res.send(500).send({message: 'Error en la peticion'})
        if(!sdrs) res.send(404).send({message: ' No hay SDRs'})
        return res.status(200).send({
            total_items: total,
            sdrs: sdrs
        })
    })

}

function saveSdr(req, res){
    var sdr = new Sdr()
    var params = req.body

    sdr.code = params.code
    sdr.zone = params.zone
    sdr.group = params.group
    sdr.description = params.description
    sdr.probability = params.probability
    sdr.exposition = params.exposition
    sdr.gravity = params.gravity
    sdr.population_at_risk = params.population_at_risk
    sdr.visibility = params.visibility
    sdr.cost = params.cost

    sdr.save(function(err,sdrStored){
        if(err) res.status(500).send({message: `Error al guardar SDR ${err}`})
        if(!sdrStored) res.status(404).send({message: 'El artista no ha sido guardado'})
        res.status(200).send({sdr: sdrStored})
    });
}

function updateSdr(req, res){
    let sdrId = req.params.sdrId
    let update = req.body

    Sdr.findByIdAndUpdate(sdrId, update, (err, sdrUpdated) => {
        if (err) res.status(500).send({message: `error al actualizar el SDR en BD ${err} `})
        if (!sdrUpdated) res.status(404).send({message: `error: Nose ha podido actualizar el SDR`})
        res.status(200).send({ sdr: sdrUpdated})
    })
}

function deleteSdr(req, res){
    let sdrId = req.params.sdrId
    
    Sdr.findByIdAndRemove(sdrId, (err, sdrRemoved) =>{
        if (err){ res.status(500).send({message: `error al eliminar el SDR en BD ${err} `})
        }else{
            if (!sdrRemoved){
                 res.status(404).send({message: `error: Nose ha podido eliminar el SDR`})
            }else{
                Mpt_ideal.find({sdr: sdrRemoved._id}).remove((err, mptIdealRemoved) =>{
                    if (err){
                        res.status(500).send({message: `error al eliminar el mpt Ideal en BD ${err} `})
                    }else{
                        if (!mptIdealRemoved){
                            res.status(404).send({message: `error: Nose ha podido eliminar el mpt Ideal`})
                        }else{
                            Mpt_partial.find({sdr: sdrRemoved._id}).remove((err, mptPartialRemoved) =>{
                                if (err){
                                    err.status(500).send({message: `error al eliminar el mpt Parcial en BD ${err} `})
                                }else{
                                    if (!mptPartialRemoved){
                                        res.status(404).send({message: `error: Nose ha podido eliminar el mpt Parcial`})
                                    }else{
                                        Mpt_patch.find({sdr: sdrRemoved._id}).remove((err, mptPatchRemoved) =>{
                                            if (err){
                                                err.status(500).send({message: `error al eliminar el mpt Parche en BD ${err} `})
                                            }else{
                                                if (!mptPatchRemoved){
                                                    res.status(404).send({message: `error: Nose ha podido eliminar el mpt Parche`})
                                                }else{
                                                    res.status(200).send({ sdrRemoved})
                                                }    
                                            }
                                        })
                                    }
                                }
                            }) 
                        } 
                    }        
                })
            }
        }
    })
}

function uploadImage(req, res){
    var sdrId = req.params.sdrId;
    var file_name = 'Imagen no subida...';
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\')
        var file_name = file_split[2]
    
        var ext_split = file_name.split('\.')
        var file_ext = ext_split[1]
    
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            Sdr.findByIdAndUpdate(sdrId, {image: file_name}, (err, sdrUpdated) =>{
                if (!sdrUpdated){
                    res.status(404).send({message: `error: Nose ha podido actualizar la imagen`})
                }else{
                    res.status(200).send({ sdr: sdrUpdated})
                }
            });
        }else{
            res.status(200).send({ message: 'Extensión de archivo no válida'})
        }
    }else{
        res.status(200).send({ message: 'No has subido ninguna imagen'})
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile
    var path_file = './uploads/sdr/'+ imageFile

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file))
        }else{
            res.status(200).send({ message: 'No existe la imagen'})
        }
    })
}


module.exports = {
    getSdr,
    saveSdr,
    getSdrs,
    updateSdr,
    deleteSdr,
    uploadImage,
    getImageFile
}