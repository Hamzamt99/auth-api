'use strict'

const express = require('express');
const app = express();
const cors = require('cors');

const router = require('./auth/routes')

app.use(cors());
app.use(express.json());

app.use(router)

function start(PORT) {
    app.listen(PORT, () => console.log('server running on port', PORT))
}

module.exports = {
    app,
    start
}