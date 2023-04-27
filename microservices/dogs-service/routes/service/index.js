const express = require('express');
const router = express.Router();
const data = require('../../data/data-dogs');

router.get('/', (req, res) => {
  const response = {
    service: 'dogs',
    architecture: 'microservices',
    data: data.dogs
  }
  return res.send(response);
});

module.exports = router;