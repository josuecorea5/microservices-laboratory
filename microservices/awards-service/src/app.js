const express = require('express');
const awards = require('../routes/service');
const loadAwards = require('../db/load-data');

loadAwards();

const app = express();

app.use('/api/v1/awards', awards)

module.exports = app;