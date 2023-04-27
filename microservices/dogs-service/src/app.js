const express = require('express');

const dogs = require('../routes/service');

const app = express();

app.use('/api/v1/dogs', dogs);

module.exports = app;