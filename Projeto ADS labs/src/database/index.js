const Sequelize = require('sequelize');
const dbConfig = require('../config/database');


const Cliente = require('../models/cliente');
const Prato = require('../models/prato');
const Pedido = require('../models/pedido');


const connection = new Sequelize(dbConfig);




Cliente.init(connection);
Prato.init(connection);
Pedido.init(connection);


Cliente.associate(connection.models);
Prato.associate(connection.models);
Pedido.associate(connection.models);


module.exports = connection;
