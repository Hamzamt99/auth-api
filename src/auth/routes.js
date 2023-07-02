'use strict'
// importing 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const user = require('../auth/models/users')
const signinMiddleware = require('../auth/middleware/basic')
const isAuth = require('..//auth/middleware/bearer')
// controller
router.get('/', isAuth, homePage)
router.post('/signup', signupHandler)
//middleware to check authorization
router.post('/signin', signinMiddleware, signinHandler)
router.get('/secret', isAuth, secretHandler)
router.get('/users', isAuth)
// Home function
function homePage(req, res) {
    try {
        res.status(200).json('welcome to home page')
    } catch (e) {
        throw new Error(e)
    }
}

// signup function
async function signupHandler(req, res) {
    try {
        const { username, password } = req.body
        const hashPass = await bcrypt.hash(password, 5)
        const obj = {
            username,
            password: hashPass
        }
        const record = await user.create(obj)
        res.status(201).json(record)
    } catch (e) {
        throw new Error(e)
    }

}
//signin function
async function signinHandler(req, res) {
    res.status(200).json(req.users)
}
//secret function 
async function secretHandler(req, res) {
    res.status(200).json('welcome to secret page')
}


module.exports = router