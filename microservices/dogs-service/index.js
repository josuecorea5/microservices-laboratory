const server = require('./src/app');

server.listen(process.env.PORT || 3000, () => {
  console.log(`Dogs service running on port ${process.env.PORT || 3000}`);
})