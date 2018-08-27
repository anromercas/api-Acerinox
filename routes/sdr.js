'use strict'

const express = require('express');
const SdrCtrl = require ('../controllers/sdr');
const api = express.Router();
const auth = require ('../middlewares/auth');
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/sdr'});

api.get('/sdr/:sdrId',auth ,SdrCtrl.getSdr);
api.get('/sdrs/:page?',auth ,SdrCtrl.getSdrs);
api.post('/sdr',auth, SdrCtrl.saveSdr);
api.put('/sdr/:sdrId',auth ,SdrCtrl.updateSdr);
api.delete('/sdr/:sdrId',auth ,SdrCtrl.deleteSdr);
api.post('/upload-image-sdr/:sdrId',auth, md_upload ,SdrCtrl.uploadImage);
api.get('/get-image-sdr/:imageFile', SdrCtrl.getImageFile);

module.exports = api;