import { Produto } from './produto';

export class ItemCarrinho {

  id:string;
  quantidade:number = 0;
  produtoId:string;
  precoTotal:number = 0;
  produto: Produto;

  constructor(dadosItem?: any) {
    if (dadosItem) {
      this.setDados(dadosItem)
    }
  }

  setDados (dadosItem?:any) {
    this.id = dadosItem.id;
    this.quantidade = Math.max(0, dadosItem.quantidade || 0);
    this.produtoId = dadosItem.produtoId;
    this.produto = dadosItem.produto ? new Produto(dadosItem.produto) : null;
    this.calcularPrecoTotal();
  }

  mudaQuantidade (diferenca:number) {
    this.quantidade = Math.max(0, this.quantidade + diferenca);
    this.calcularPrecoTotal();
  }

  calcularPrecoTotal () {
    this.precoTotal = (this.quantidade||0) * (this.produto ? this.produto.preco : 0);
  }

}
