'use strict'

const express = require('express');
const UserCtrl = require('../controllers/user');
const api = express.Router();
const auth = require ('../middlewares/auth');
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/users'});

//rutas
api.post('/register', UserCtrl.saveUser);
// api.post('/register/:token?', UserCtrl.saveUser);
api.post('/login', UserCtrl.loginUser);
api.put('/update-user/:userId', auth, UserCtrl.updateUser);
api.post('/upload-image-user/:userId', auth, md_upload, UserCtrl.uploadImage);
api.get('/get-image-user/:imageFile',auth, UserCtrl.getImageFile);

api.get('/user/:desde?', UserCtrl.getUsers);
api.get('/user/:userId', UserCtrl.getUser);

api.delete('/user/:userId', auth, UserCtrl.deleteUser);
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' });
})

module.exports = api;