'use strict'

const express = require('express');
const PartialCtrl = require ('../controllers/mpt_partial');
const api = express.Router();
const auth = require ('../middlewares/auth');
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/mpt_partial'});

api.get('/mpt-partial/:partialId',auth ,PartialCtrl.getPartial);
api.get('/mpts-partial/',auth ,PartialCtrl.getPartials);
api.post('/mpt-partial',auth, PartialCtrl.savePartial);
api.put('/mpt-partial/:partialId',auth, PartialCtrl.updatePartial);
api.delete('/mpt-partial/:partialId',auth, PartialCtrl.deletePartial);
api.post('/upload-file-partial/:partialId',auth, md_upload ,PartialCtrl.uploadFile);
api.get('/get-file-partial/:file',auth, PartialCtrl.getFile);


module.exports = api;