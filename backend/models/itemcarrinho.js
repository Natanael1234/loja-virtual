'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemCarrinho extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ItemCarrinho.belongsTo(models.Produto, {as:'produto'});
    }
  };
  ItemCarrinho.init({
    quantidade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ItemCarrinho',
  });
  return ItemCarrinho;
};