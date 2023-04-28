const express = require('express');
const router = express.Router();
const data = require('../../races_info.json');

router.get('/', (req, res) => {
  const { id, name } = req.query;

  if(!id && !name) {
    const response = {
      service: 'races',
      architecture: 'microservices',
      data: data
    }
    return res.send(response);
  }
  
  try {
    const race = data.find((race) => {
      return (
        id && race.id === id.trim() ||
        name && race.raza === name.trim()
      )
    });
    console.log(race);
    const response = {
      service: 'races',
      architecture: 'microservices',
      data: race
    };
    return res.send(response);
  } catch (error) {
    return res.status(404).send({message: 'Race not found'})
  }

});

module.exports = router;