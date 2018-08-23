'use strict'

const express = require('express');
const PatchCtrl = require ('../controllers/mpt_patch')
const api = express.Router();
const auth = require ('../middlewares/auth')
const multipart = require('connect-multiparty')
const md_upload = multipart({uploadDir: './uploads/mpt_patch'})

api.get('/mpt-patch/:patchId',auth ,PatchCtrl.getPatch)
api.get('/mpts-patch/:sdrId?',auth ,PatchCtrl.getPatchs)
api.post('/mpt-patch',auth, PatchCtrl.savePatch)
api.put('/mpt-patch/:patchId',auth, PatchCtrl.updatePatch)
api.delete('/mpt-patch/:patchId',auth, PatchCtrl.deletePatch)
api.post('/upload-file-patch/:patchId',auth, md_upload ,PatchCtrl.uploadFile)
api.get('/get-file-patch/:file', PatchCtrl.getFile)


module.exports = api;