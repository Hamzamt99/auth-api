'use strict'

require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize')

const DATA_BASE = process.env.DATA_BASE_URL;

const sequelize = new Sequelize(DATA_BASE,{})

module.exports =  sequelize


