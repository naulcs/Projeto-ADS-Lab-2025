const { Sequelize } = require('sequelize');

module.exports = {
  dialect: 'sqlite',
  storage: './restaurante.sqlite', 
  define: {
    timestamps: true, 
    underscored: true, 
  },
};