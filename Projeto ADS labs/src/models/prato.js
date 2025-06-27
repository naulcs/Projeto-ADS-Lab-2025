const { Model, DataTypes } = require('sequelize');

class Prato extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
      preco: DataTypes.FLOAT,
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsToMany(models.Pedido, {
      foreignKey: 'prato_id',
      through: 'pedido_pratos', 
      as: 'pedidos'
    });
  }
}

module.exports = Prato;