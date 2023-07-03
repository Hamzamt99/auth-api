'use strict'

require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize')

const DATABASE_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATA_BASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
} : {}

const sequelize = new Sequelize(DATABASE_URI, sequelizeOptions)

module.exports = sequelize


