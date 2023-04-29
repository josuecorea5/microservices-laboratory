const express = require('express');
const Championships = require('../../db/Championship');
const axios = require('axios');

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

router.get('/:puntaje', async(req,res) => {
  try {    
    const { puntaje } = req.params;
    const puntajeAwards = await  Championships.findAll({
      where: {
        puntaje: puntaje
      }
    })
    const raceDogs = puntajeAwards.map((award) => {
      return axios.get(`http://dogs:3000/api/v1/dogs?id=${award.id_campeon}`);
    })
    const dogs = await Promise.all(raceDogs);

    const dogsResponse = dogs.map((dog) => {
      return dog.data.data;
    }).filter(dog => dog !=  null)

    const dogsRace = dogsResponse.map((dog) => axios.get(`http://races:4000/api/v1/races?name=${dog.raza}`))

    const dogsRaceResponse = await Promise.all(dogsRace); 

    const races = dogsRaceResponse.map((race) => {
      return race.data.data;
    })
    const response = {
      service: 'awards',
      architecture: 'microservices',
      data: {
        races,
        dogs: dogsResponse
      }
    }
    return res.send(response);
  } catch (error) {
    return res.status(501).send({message: 'Something faild'})
  }
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