const { Model, DataTypes } = require('sequelize');

class Cliente extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      cpf: DataTypes.STRING,
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.hasMany(models.Pedido, { foreignKey: 'cliente_id', as: 'pedidos' });
  }
}

module.exports = Cliente;