'use strict'
// importing 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const user = require('../auth/models/users')
const signinMiddleware = require('../auth/middleware/basic')
const isAuth = require('../auth/middleware/bearer')
const acl = require('./middleware/acl')
// controller
router.get('/', acl('delete'), homePage)
router.post('/signup', signupHandler)
//middleware to check authorization
router.post('/signin', signinMiddleware, signinHandler)
router.get('/secretstuff', isAuth, acl('read'), secretHandler)
router.post('/secretstuff', isAuth, acl('create'), secretHandler)
router.put('/secretstuff', isAuth, acl('update'), secretHandler)
router.delete('/secretstuff', isAuth, acl('delete'), secretHandler)
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
        const { username, password, role } = req.body
        const obj = {
            username,
            password,
            role
        }
        const record = await user.create(obj)
        res.status(201).json(record)
    } catch (e) {
       next('error')
    }

}
//signin function
async function signinHandler(req, res) {
    res.status(200).json(req.users)
    console.log(req.users);
}
//secret function 
async function secretHandler(req, res) {
    res.status(200).json('welcome to secret page')
}


module.exports = router