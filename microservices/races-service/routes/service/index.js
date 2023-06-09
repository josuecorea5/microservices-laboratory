const express = require('express');
const router = express.Router();
const data = require('../../races_info.json');
const axios = require('axios');

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

router.get('/characteristics', (req, res) => {
  const { tamanio_de_pelo, color_de_pelo } = req.query;
  try {
    const races = data.filter((race) => race.tamanio_de_pelo === tamanio_de_pelo.trim() && race.color_de_pelo.includes(color_de_pelo.trim())).map((data) => {
      return {
        ...data,
        color_de_pelo: data.color_de_pelo.reduce((acc,value) => {
          if(value === color_de_pelo.trim()) {
            return acc + value
          }
          return acc
        }, '')
      }
    });
    const response = {
      service: 'races',
      architecture: 'microservices',
      data: races
    }    
    return res.send(response);
  } catch (error) {
    return res.status(404).send({message:'Races not found'})
  }
})

router.get('/:race', async(req, res) => {
  const { race } = req.params;
  try {
    const dogs = await axios.get(`http://dogs:3000/api/v1/dogs/${race}`);

    const averageRace = dogs.data.data.reduce((acc,dog) => {
      console.log(acc)
      return {
        ...acc,
        race: dog.raza,
        average: Math.ceil((acc.average + dog.peso) / 2 )
      }
    }, {average: 0});
    const response = {
      service: 'races',
      architecture: 'microservices',
      data: averageRace
    };
    return res.send(response);
  } catch (error) {
    return res.status(500).send({message: 'Internal server error'})
  }
});

// router.get('/:race', async(req, res) => {
//   const { race } = req.params;
//   try {
//     const dogs = await axios.get(`http://dogs:3000/api/v1/dogs/${race}`);
//     const dogsResponse = dogs.data.data;
//     const dogsAwards = dogsResponse.map((dog) => {
//       return axios.get(`http://awards:5000/api/v1/awards/dog/${dog.Id}`);
//     });
//     const dogsAwardsResponse = await Promise.all(dogsAwards);
//     const dogsAwardsData = dogsAwardsResponse.reduce((acc,dog) => {
//       return [...acc, ...dog.data.data]
//     }, []);
//     const response = {
//       data: {
//         dogs: dogsResponse,
//         awards: dogsAwardsData
//       }
//     };

//     return res.send(response);
//   } catch (error) {
//     return res.status(500).send({message: 'Internal server error'})
//   }
// });


module.exports = router;