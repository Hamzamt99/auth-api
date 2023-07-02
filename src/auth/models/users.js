'use strict'
//importing
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
// calling the database
const sequelize = require('../../models/index')
//import the datatypes from sequelize
const { DataTypes } = require('sequelize')

// create the shcema table
const users = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        uniqe: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.VIRTUAL
    }
})

// function to find the username then compare the password if it is valid then return the user to the middleware if true
users.signinMiddleware = async function (username, password) {
    try {
        const user = await users.findOne({ where: { username } })
        const isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            const userToken = jwt.sign({ username: user.username }, SECRET)
            return {
                user,
                Token: userToken
            }
        } else {
            next('not authorized')
        }
    } catch (e) {
        console.log(e)
    }

}
users.bearerToken = async function (token) {
    const parseToken = jwt.verify(token, SECRET)
    const findUser = await users.findOne({ where: { username: parseToken.username } })
    if(findUser){
        console.log(findUser);
        return findUser;
    }else {
        throw new Error('invalid token')
    }
    
}

module.exports = users