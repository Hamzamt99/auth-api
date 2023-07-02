'use strict'

//importing
const base64 = require('base-64')
const user = require('../models/users')

//middleware to handle the user name and password that came from the header
module.exports = async function signinMiddleware(req, res, next) {
    const auth = req.headers.authorization.split(" ").pop();
    if (auth) {
        const decoded = base64.decode(auth)
        const [username, password] = decoded.split(":")
        user.signinMiddleware(username, password).then(data => {
            req.users = data
            next();
        })
    } else {
        throw new Error('not authorized')
    }
}