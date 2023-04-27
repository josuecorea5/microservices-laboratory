const express = require('express');
const Championships = require('../../db/Championship');

const router = express.Router();

router.get('/', async (req, res) => {
  const championships = await Championships.findAll();
  const response = {
    service: 'awards',
    architecture: 'microservices',
    data: championships
  }
  return res.send(response);
});

module.exports = router;