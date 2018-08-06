'use strict'

const express = require('express');
const IdealCtrl = require ('../controllers/mpt_ideal')
const api = express.Router();
const auth = require ('../middlewares/auth')
const multipart = require('connect-multiparty')
const md_upload = multipart({uploadDir: './uploads/mpt_ideal'})

api.get('/mpt-ideal/:idealId',auth ,IdealCtrl.getMptIdeal)
//api.get('/sdrs/:page?',auth ,SdrCtrl.getSdrs)
/*api.post('/mpt_ideal',auth, SdrCtrl.saveIdeal)
api.put('/mpt_ideal/:idealId',auth ,SdrCtrl.updateIdeal)
api.delete('/mpt_ideal/:idealId',auth ,SdrCtrl.deleteIdeal)
api.post('/upload-mpt_ideal/:idealId',auth, md_upload ,SdrCtrl.uploadfile)
api.get('/get-file-mpt_ideal/:file', SdrCtrl.getFile)
*/
module.exports = api;