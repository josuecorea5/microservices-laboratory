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

router.get('/dog/:id', async(req,res) => {
  const { id } = req.params;
  const awardsDog = await Championships.findAll({
    where: {
      id_campeon: +id
    }
  });
  
  const response = {
    service: 'awards',
    architecture: 'microservices',
    data: awardsDog
  }
  return res.send(response);
})

router.get('/:id', async(req,res) => {
  const { id } = req.params;
  const championship = await Championships.findByPk(id);
  const response = {
    service: 'awards',
    architecture: 'microservices',
    data: championship
  }
  return res.send(response);
})


module.exports = router;