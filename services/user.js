'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user){
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        secondsurname: user.secondsurname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token){
    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            if(payload.exp < moment().unix()){
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }

            resolve(payload.sub)
        }catch(err){
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })
    console.log(decoded)
    return decoded
}

module.exports = { 
    createToken,
    decodeToken
}