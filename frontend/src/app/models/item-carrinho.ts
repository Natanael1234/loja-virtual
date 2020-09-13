import { Produto } from './produto';

export class ItemCarrinho {

  quantidade:number = 0;
  precoTotal:number = 0;
  produto: Produto;

  constructor(produto: Produto, quantidade:number) {
    this.setProduto(produto)
    this.definirQuantidade(quantidade);
  }

  setProduto (produto:Produto) {
    if (!produto) throw new Error("Produto indefinido.");
    this.produto = produto;
    this.calcularPrecoTotal();
  }

  incrementarQuantidade (quantidade:number) {
    this.definirQuantidade(this.quantidade + quantidade);
  }

  definirQuantidade (quantidade:number) {
    this.quantidade = Math.min(Math.max(0, quantidade || 0), Math.max(0, this.produto?.quantidadeEstoque || 0));
    this.calcularPrecoTotal();
  }

  calcularPrecoTotal () {
    this.precoTotal = (this.quantidade || 0) * (this.produto?.preco || 0);
  }

}
