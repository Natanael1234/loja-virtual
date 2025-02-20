'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Produto.init({
    nome: DataTypes.STRING,
    cod: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.DOUBLE,
    thumbnail: DataTypes.STRING,
    imagens: {
      type: DataTypes.TEXT,
      get: function () {
        let imagensArray = this.getDataValue('imagens');        
        return JSON.parse(imagensArray || []);
      },
      set: function (imagensArray) {        
        this.setDataValue('imagens', JSON.stringify(imagensArray || []));
      }
    },
    quantidadeEstoque: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};