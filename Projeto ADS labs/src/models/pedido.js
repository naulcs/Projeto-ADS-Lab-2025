const { Model, DataTypes } = require('sequelize');

class Pedido extends Model {
  static init(sequelize) {
    super.init({
      valor_total: DataTypes.FLOAT,
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
    this.belongsToMany(models.Prato, {
      foreignKey: 'pedido_id',
      through: 'pedido_pratos', 
      as: 'pratos'
    });
  }
}

module.exports = Pedido;