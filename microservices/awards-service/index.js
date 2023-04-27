const server = require('./src/app');

server.listen(process.env.PORT || 5000, () => {
  console.log(`Awards service is running on port ${process.env.PORT || 5000}`)
})