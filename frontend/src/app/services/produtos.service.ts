import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtos=[];

  constructor() {
    for (let i = 0; i < 20; i++) {
      let produto = new Produto();
      produto.id = `${i}`;
      produto.preco = Math.random() * 1000000 / 100;
      produto.nome = `Produto #${i}`;
      produto.thumbnail = `assets/imgs/produtos/tv.webp`;
      produto.descricao = `Descrição do preoduto ${i}. Blá blá blá blá`;
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



}
