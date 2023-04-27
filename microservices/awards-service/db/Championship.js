const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database');

class Championship extends Model {}

Championship.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  id_campeon: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  anio_campeonato: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lugar: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categoria_ganada: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pais_competencia: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  premio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  puntaje: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'campeonatos',
  timestamps: false,
});

module.exports = Championship;
