'use strict'

const user = require('../models/users')

module.exports = async function isAuth(req,res,next){
    const token = req.headers.authorization.split(" ").pop();
    user.bearerToken(token).then(data =>{
        req.token = data;
        next();
    })
}