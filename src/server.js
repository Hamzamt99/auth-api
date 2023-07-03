'use strict'

const express = require('express');
const app = express();
const cors = require('cors');

const router = require('./auth/routes')
const Error404 = require('./error-handlers/404')
const Error500 = require('./error-handlers/500')


app.use(cors());
app.use(express.json());
app.use(router)
app.use(Error404)
app.use(Error500)

function start(PORT) {
    app.listen(PORT, () => console.log('server running on port', PORT))
}

module.exports = {
    app,
    start
}