const server = require('./src/app');

server.listen(process.env.PORT || 4000, () => {
  console.log(`Races service is running on port ${process.env.PORT || 4000}`)
})