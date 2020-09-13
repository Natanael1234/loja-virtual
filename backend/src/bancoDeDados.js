const geradorDeProdutos = require('./seeders/gera-produtos');

const itemSequence = { _id: 1, get id() { return this._id++; } };

const carrinho = {};
const produtos = {};
let itensCarrinho = {};
let dadosProdutos = geradorDeProdutos(true);
for (let k in dadosProdutos) {
    produtos[dadosProdutos[k].id] = dadosProdutos[k];
}

module.exports.comprar = async () => {
    return this.esvaziarCarrinho();
}

module.exports.esvaziarCarrinho = async () => {
    let itens = await this.getItensCarrinho();    
    if (!itens || !itens.length) {
        throw new Error('Carrinho vazio.');
    }
    itensCarrinho = {};
    return this.getCarrinho();
}

module.exports.adicionarItemCarrinho = async (produtoId, quantidade) => {    
    let itemCarrinho = await module.exports.getItemCarrinho(produtoId);
    if (itemCarrinho) {
        quantidade = (itemCarrinho.quantidade || 0) + (quantidade || 0);
        return module.exports.salvarItemCarrinho(produtoId, quantidade, carrinho.formaPagamento);
    } else {
        return module.exports.salvarItemCarrinho(produtoId, quantidade, 1);
    }
}

module.exports.salvarItemCarrinho = async (produtoId, quantidade, formaPagamento) => {    
    let produto =  await module.exports.getProduto(produtoId);
    quantidade = Math.max(0, quantidade || 0);
    if (!produto) {
        throw new Error('Produto não encontrado.');
    } 
    else if (quantidade > produto.quantidadeEstoque || 0) {
        throw new Error('Quantidade maior que o estoque.');
    } 
    else if (!formaPagamento || formaPagamento < 1 || formaPagamento > 3) {
        throw new Error('Forma de pagamento inválida.');
    }
    let itemCarrinho = await module.exports.getItemCarrinho(produtoId);
    // se o ítem não está no carrinho
    if (!itemCarrinho) {
        // cria novo item
        itemCarrinho = { id: itemSequence.id, produtoId };
    }
    // se o item já está no carrinho
    else  {        
    }    
    carrinho.formaPagamento = formaPagamento;
    itemCarrinho.quantidade = quantidade;
    itensCarrinho[produtoId] = itemCarrinho;

    return module.exports.getCarrinho();
}

module.exports.deletaItemCarrinho = async (produtoId) => {
    let item = itensCarrinho[produtoId];
    if (!item) throw new Error('Item não encontrado.');
    delete itensCarrinho[produtoId];
    return this.getCarrinho();
}

module.exports.getCarrinho = async () => {
    let carrinhoCopia = JSON.parse(JSON.stringify(carrinho));    
    carrinhoCopia.itens = await module.exports.getItensCarrinho();    
    return carrinhoCopia;
}

module.exports.getItensCarrinho = async () => {
    let itensCopia = JSON.parse(JSON.stringify(Object.values(itensCarrinho)));
    for(let itemCopia of itensCopia) {
        itemCopia.produto = await module.exports.getProduto(itemCopia.produtoId);
    }
    return itensCopia || [];
}

module.exports.getItemCarrinho = async (produtoId) => {
    let item = itensCarrinho[produtoId];
    if (item) {
        return JSON.parse(JSON.stringify(item));
    }
    return undefined;
}

module.exports.getProdutos = async () => {
    return Object.values(produtos);
}

module.exports.getProduto = async function getProduto (produtoId) {
    let produto = produtos[produtoId];
    if (produto) {
        return JSON.parse(JSON.stringify(produto));
    }
    return undefined;
}
