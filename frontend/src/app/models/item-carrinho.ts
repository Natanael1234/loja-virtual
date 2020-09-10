import { Produto } from './produto';

export class ItemCarrinho {

  quantidadeEstoque:number = 0;
  quantidade:number = 0;
  precoTotal:number = 0;
  produto: Produto;

  constructor(produto: Produto, quantidade:number) {
    if (!produto) throw new Error("Produto indefinido.");
    this.quantidade = Math.min(Math.max(0, quantidade || 0), this.quantidadeEstoque);
    this.calcularPrecoTotal();
  }

  mudaQuantidade (diferenca:number) {
    this.quantidade = Math.min(Math.max(0, this.quantidade + diferenca), this.quantidadeEstoque);
    this.calcularPrecoTotal();
  }

  calcularPrecoTotal () {
    this.precoTotal = (this.quantidade||0) * (this.produto ? this.produto.preco : 0);
  }

}
