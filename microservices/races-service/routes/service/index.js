const express = require('express');
const router = express.Router();
const data = require('../../races_info.json');

router.get('/', (req, res) => {
  const response = {
    service: 'races',
    architecture: 'microservices',
    data: data
  }
  return res.send(response);
});

module.exports = router;