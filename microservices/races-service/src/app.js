const express = require('express');
const races = require('../routes/service');

const app = express();

app.use('/api/v1/races', races);

module.exports = app;