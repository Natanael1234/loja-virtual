'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const ENV = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[ENV];
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);    
    db[model.name] = model;
  });
  
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  
module.exports = db;


// Cria models
// src> ../node_modules/.bin/sequelize model:generate --name Produto --attributes nome:string,cod:string,descricao:string,preco:double, thumbnail:string, quantidadeEstoque:integer
// src> ../node_modules/.bin/sequelize model:generate --name Carrinho --attributes formaPagamento:integer
// src> ../node_modules/.bin/sequelize model:generate --name ItemCarrinho --attributes quantidade:integer

// export NODE_ENV=development ???

// Gera as tabelas a partir dos models
// src> ../node_modules/.bin/sequelize db:migrate

// Popula a base de dados (não apaga os dados anteriores)
// src> ../node_modules/.bin/sequelize seed:generate --name seed-product
// src> ../node_modules/.bin/sequelize db:seed:all



