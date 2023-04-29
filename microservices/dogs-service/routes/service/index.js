const express = require('express');
const router = express.Router();
const data = require('../../data/data-dogs');

router.get('/', (req, res) => {
  const { id, name } = req.query;

  if(!id && !name) {
    const response = {
      service: 'dogs',
      architecture: 'microservices',
      data: data.dogs
    }
    return res.send(response);
  }
  try {
    const dog = data.dogs.find(dog => dog.Id === +id || dog.nombre_perro === name.trim());
    const response = {
      service: 'dogs',
      architecture: 'microservices',
      data: dog
    }
    return res.send(response);
  } catch (error) {
    return res.status(404).send({message: 'Dog not found'});
  }
});

router.get('/dog/:name', async(req, res) => {
  const { name } = req.params;

  try {
    const dogs = data.dogs.find((dog) => {
      return dog.nombre_perro === name.trim();
    })

    const dogsAwards = await axios.get(`http://awards:5000/api/v1/awards/dog/${dogs.Id}`);
    console.log(dogsAwards)
    // const dogsAwardsData = dogsAwardsResponse.reduce((acc,dog) => {
    //   return [...acc, ...dog.data.data]
    // }, []);
    const response = {
      service: 'dogs',
      architecture: 'microservices',
      data: dogsAwards.data.data
    };

    return res.send(response);
  } catch (error) {
    return res.status(500).send({message: 'Internal server error'})
  }
});

router.get('/:race', (req, res) => {
  const { race } = req.params;
  try {
    const dogs = data.dogs.filter((dog) => dog.raza === race.trim());
    const response = {
      service: 'dogs',
      architecture: 'microservices',
      data: dogs
    };
    return res.send(response);
  } catch (error) {
    return res.status(404).send({message: 'Dog not found'});
  }
});


module.exports = router;