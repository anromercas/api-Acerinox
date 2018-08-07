'use strict'

const express = require('express');
const IdealCtrl = require ('../controllers/mpt_ideal')
const api = express.Router();
const auth = require ('../middlewares/auth')
const multipart = require('connect-multiparty')
const md_upload = multipart({uploadDir: './uploads/mpt_ideal'})

api.get('/mpt-ideal/:idealId',auth ,IdealCtrl.getIdeal)
api.get('/mpts-ideal/:sdrId?',auth ,IdealCtrl.getIdeals)
api.post('/mpt-ideal',auth, IdealCtrl.saveIdeal)
api.put('/mpt-ideal/:idealId',auth, IdealCtrl.updateIdeal)
api.delete('/mpt-ideal/:idealId',auth, IdealCtrl.deleteIdeal)
api.post('/upload-file-ideal/:idealId',auth, md_upload ,IdealCtrl.uploadFile)
api.get('/get-file-ideal/:file', IdealCtrl.getFile)


module.exports = api;