'use strict'

require('dotenv').config()

const sequelize = require('./src/models/index')

const PORT = process.env.PORT || 3005

const { start } = require('./src/server')

sequelize.sync().then(() => {
    start(PORT)
}).catch(error => console.log(error))
