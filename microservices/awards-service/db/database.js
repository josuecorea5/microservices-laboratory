const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('awards', 'root', 'password', {
  dialect: 'sqlite',
  host: './dogs.sqlite'
})

module.exports = sequelize;