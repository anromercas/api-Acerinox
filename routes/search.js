'use strict'

const express = require('express');
const SearchCtrl = require ('../controllers/search');
const api = express.Router();
const auth = require ('../middlewares/auth');
const multipart = require('connect-multiparty');


api.get('/search/all/:search',auth ,SearchCtrl.searchAll);
api.get('/search/:table/:search',auth ,SearchCtrl.searchCollection);


module.exports = api;