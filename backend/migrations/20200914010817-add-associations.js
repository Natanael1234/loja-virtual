'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // Carrinho hasMany ItemCarrinho
    return queryInterface.addColumn(
        'ItemCarrinhos', // name of Target model
        'CarrinhoId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Carrinhos', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
      .then(()=>{
        // ItemCarrinho belongsTo Produto
        return queryInterface.addColumn(
          'ItemCarrinhos', // name of Source model
          'ProdutoId', // name of the key we're adding 
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Produtos', // name of Target model
              key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      });
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // remove Carrinho hasMany ItemCarrinho
    return queryInterface.removeColumn(
      'ItemCarrinhos', // name of the Target model
      'CarrinhoId' // key we want to remove
    )
    .then(()=>{
      // remove ItemCarrinho belongsTo Produto
      return queryInterface.removeColumn(
        'ItemCarrinhos', // name of Source model
        'ProdutoId' // key we want to remove
      )
    });
    
      
  }
};
