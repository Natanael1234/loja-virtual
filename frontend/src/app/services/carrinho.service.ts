import { Injectable } from '@angular/core';
import { Carrinho } from '../models/carrinho';
import { Produto } from '../models/produto';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  carrinho:Carrinho = new Carrinho();

  constructor(public api: ApiService) {
    this.setCarrinho({formaPagamento:1});
  }

  async salvarItem (produtoId:string, quantidade:number, formaPagamento:number) {
    let dadosCarrinho = await this.api.post('carrinho', {produtoId, quantidade, formaPagamento});
    this.setCarrinho(dadosCarrinho);
    return this.carrinho;
  }

  async adicionarProduto (produtoId:string, quantidade:number) {
    let dadosCarrinho = await this.api.post('carrinho/add', {produtoId, quantidade});
    this.setCarrinho(dadosCarrinho);
    return this.carrinho;
  }

  async deletarItem (produtoId:string) {
    let dadosCarrinho = await this.api.delete('carrinho/item/' + produtoId);
    this.setCarrinho(dadosCarrinho);
    return this.carrinho;
  }

  async getCarrinho () {
    let dadosCarrinho = await this.api.get('carrinho');
    this.setCarrinho(dadosCarrinho);
    return this.carrinho;
  }

  async comprar () {
    let dadosCarrinho = await this.api.get('comprar');
    this.setCarrinho(dadosCarrinho);
    return this.carrinho;
  }

  async esvaziar () {
    let dadosCarrinho = await this.api.delete('carrinho');
    this.setCarrinho(dadosCarrinho);
    return this.carrinho;
  }

  private setCarrinho (dadosCarrinho:any) {
    let carrinho = new Carrinho();
    carrinho.formaPagamento = dadosCarrinho?.formaPagamento || carrinho?.formaPagamento || 1;
    if (dadosCarrinho?.itens?.length) {
      for(let dadosItem of dadosCarrinho.itens) {
        let produto = new Produto(dadosItem?.produto);
        carrinho.setItem(produto, dadosItem.quantidade||0);
      }
    }
    this.carrinho = carrinho;
  }

}
