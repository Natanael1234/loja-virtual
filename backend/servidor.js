const porta = 3003;

const express = require('express');
var cors = require('cors');
const app = new express();
const bodyParser = require('body-parser');
const db = require('./models');
const itemcarrinho = require('./models/itemcarrinho');
// app.use(bodyParser. urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/produtos', async (req, res, next)=>{    
    try {        
        let produtos = await db.Produto.findAll();        
        res.send(produtos);
    } catch (error) {        
        res.status(400).send({ message: error.message });        
    }
});

app.get('/produto/:produtoId', async (req, res, next)=>{
    try {
        let produtoId = parseInt(req.params.produtoId);
        let produto = await db.Produto.findOne({where:{id:produtoId}});
        if (!produto) {
            res.status(404).send({ message: 'Produto não encontrado.' });    
        } else {
            res.send(produto);
        }
    } catch (error) {        
        res.status(400).send({ message: error.message });
    }
});

let buscaCarrinoCompleto = async () => {
    let carrinho = await db.Carrinho.findOne({
        include:[{
            model:db.ItemCarrinho,
            as: 'itens',
            include: [{model:db.Produto, as:'produto'}]
        }]
    });
    
    return carrinho;
};

app.get('/carrinho', async (req, res, next)=>{    

    try {
        let carrinho = await buscaCarrinoCompleto();
        if (!carrinho) {
            carrinho = await db.Carrinho.create({formaPagamento:1});            
            carrinho = await buscaCarrinoCompleto();            
        }
        res.send(carrinho);
    } catch (error) {        
        res.status(400).send({ message: error.message });        
    }
});

let salvarItem = async (req, res, next, adicionar) => {
    try {
        let {produtoId,quantidade,formaPagamento} = req.body;        
        // busca o carrinho na base
        let carrinho = await db.Carrinho.findOne();
        // se o carrinho ainda não existe
        if (!carrinho) {
            // cria o carrinho
            carrinho = await db.Carrinho.create({formaPagamento:formaPagamento||1});
        }
        // busca o produto.
        let produto = await db.Produto.findOne({where:{id:produtoId}});
        // se não encontrou o produto retorna erro.
        if (!produto) {
            res.status(404).send({message:'Produto não encontrado.'});
        }        
        // se encontrou o produto
        else {
            // busca o item.
            let item = await db.ItemCarrinho.findOne({where:{ProdutoId:produtoId}});
            // cria o item, se não encontrou.
            if (!item) {
                let dadosProduto = {
                    quantidade:Math.max(quantidade||0, 0)
                }
                item = db.ItemCarrinho.build(dadosProduto);
                item.CarrinhoId = carrinho.id;
                item.produtoId = produto.id;
            } 
            // atualiza o item, se o encontrou.
            else {
                if (adicionar) { 
                    quantidade = (item.quantidade||0) + (quantidade||0);                
                }
                quantidade = Math.max(quantidade||0, 0);
                item.quantidade = quantidade || 0;
                item.CarrinhoId = carrinho.id
            }
            // se quantidade solicitada maior que quantidade em estoque.
            if (item.quantidade > produto.quantidadeEstoque) {
                throw new Error('Quantidade selecionada acima do estoque.');
            } 
            // se a quantidade solicitada está dentro dos limites do estoque.
            else {
                // salva o item
                await item.save();
                // retorna o carrinho
                carrinho = await  buscaCarrinoCompleto();        
                res.send(carrinho);
            }   

        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

/** Define a quantidade exata do item no carrinho. */
app.post('/carrinho', async (req, res, next)=>{
    salvarItem(req, res, next, false);
});

/** Adiciona uma quantidade do item ao carrinho. */
app.post('/carrinho/add', async (req, res, next)=>{
    salvarItem(req, res, next, true);
});

let deletaCarrinho = async () => {
    let carrinho = await db.Carrinho.findOne();
    let ret= await db.ItemCarrinho.destroy({where:{CarrinhoId:carrinho.id}});
    carrinho = await buscaCarrinoCompleto();
    return carrinho;
}

app.get('/comprar', async (req, res, next)=>{
    try {
        const carrinho = await deletaCarrinho();
        res.send(carrinho);        
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.delete('/carrinho', async (req, res, next)=>{
    try {
        let carrinho = await deletaCarrinho();
        res.send(carrinho);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.delete('/carrinho/item/:produtoId', async (req, res, next)=>{
    try {
        let produtoId = parseInt(req.params.produtoId);
        let item = await db.ItemCarrinho.findOne({where:{ProdutoId:produtoId}});
        if (!item) {
            res.status(404).send({ message: 'Item não encontrado.' });                
        } else {            
            await item.destroy();
            let carrinho = await buscaCarrinoCompleto();
            res.send(carrinho);
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.listen(porta, ()=>{
    console.log(`Servidor executando na porta ${porta}.`)
});