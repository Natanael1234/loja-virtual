const porta = 3003;

const express = require('express');
var cors = require('cors');
const app = new express();
const bodyParser = require('body-parser');
const db = require('./bancoDeDados');
// app.use(bodyParser. urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/produtos', async (req, res, next)=>{    
    try {
        let produtos = await db.getProdutos();
        res.send(produtos);
    } catch (error) {        
        res.status(400).send({ message: error.message });        
    }
});

app.get('/produto/:produtoId', async (req, res, next)=>{
    try {
        let produtoId = parseInt(req.params.produtoId);
        let produto = await db.getProduto(produtoId);
        res.send(produto);
    } catch (error) {        
        res.status(400).send({ message: error.message });
    }
});

app.get('/carrinho', async (req, res, next)=>{    
    try {
        let carrinho = await db.getCarrinho();
        res.send(carrinho);
    } catch (error) {        
        res.status(400).send({ message: error.message });        
    }
});


app.post('/carrinho', async (req, res, next)=>{
    try {
        let {produtoId,quantidade,formaPagamento} = req.body;
        const carrinho = await db.salvarItemCarrinho(produtoId, quantidade, formaPagamento);
        res.send(carrinho);        
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.post('/carrinho/add', async (req, res, next)=>{
    try {
        const carrinho = await db.adicionarItemCarrinho(
            req.body.produtoId,        
            req.body.quantidade
        );
        res.send(carrinho);        
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.get('/comprar', async (req, res, next)=>{
    try {
        const carrinho = await db.comprar();
        res.send(carrinho);        
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.delete('/carrinho', async (req, res, next)=>{
    try {
        const carrinho = await db.esvaziarCarrinho();
        res.send(carrinho);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.delete('/carrinho/item/:produtoId', async (req, res, next)=>{
    try {
        let produtoId = parseInt(req.params.produtoId);
        let carrinho = await db.deletaItemCarrinho(produtoId);
        res.status(200).send(carrinho);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.listen(porta, ()=>{
    console.log(`Servidor executando na porta ${porta}.`)
});