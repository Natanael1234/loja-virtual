'use strict';
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
let geradorDeProdutos = require('./gera-produtos');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */

    /** POPULA A TABELA DE PRODUTOS */

    let seedData = geradorDeProdutos(false);
    // simula produto sem estoque.
    seedData[1].quantidadeEstoque = 0;
    await queryInterface.bulkInsert('Produtos', seedData, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Produtos', null, {});

  }
};
