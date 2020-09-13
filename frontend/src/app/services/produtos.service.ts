import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { ApiService } from './api.service';
import { CarrinhoService } from './carrinho.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtos=[];

  constructor(public api: ApiService, public carrinhoServide:CarrinhoService) {
    for (let i = 0; i < 20; i++) {
      let produto = new Produto();
      produto.id = `${i}`;
      produto.preco = Math.random() * 1000000 / 100;
      produto.nome = `Notebook Acer Aspire 3 A315-42g-r2lk Ryzen 7 12gb 512gb`;
      produto.thumbnail = `assets/imgs/produtos/tv.webp`;
      produto.descricao = `Descrição
      Marca
      Acer

      Modelo
      A315-42G-R2LK

      Processador
      AMD Ryzen 7 – 3700U
      Quad Core`;
      produto.quantidadeEstoque = Math.round(Math.random() * 10);
      this.produtos.push(produto);
    }
  }

  public async getProdutos () : Promise<Produto[]> {
    return this.produtos;
  }

  public async getProduto (produtoId:string) : Promise<Produto> {
    let produto = this.produtos.find(produto=>{
      return produto.id == produtoId;
    });
    if (!produto) throw new Error('Produto não encontrado.');
    return produto;
  }

  public async getProdutosApi () {
    let dadosProdutos:any[] = await this.api.get('produtos') as any[];
    return dadosProdutos.map(dadosProduto=>{
      return new Produto(dadosProduto);
    });
  }

  public async getProdutoApi (produtoId:string) {
    let dadosProduto:any = await this.api.get('produto/' + produtoId) as any;
    return new Produto(dadosProduto);
  }

}
