import { ItemCarrinho } from './item-carrinho';

export class Carrinho {

  id: string;
  itens: ItemCarrinho[] = [];
  precoTotal: number;
  formaPagamento: number;

  constructor(dadosCarrinho?: any) {

    if (dadosCarrinho) {
      this.setDados(dadosCarrinho);
    }

  }

  setDados(dadosCarrinho: any) {
    this.id = dadosCarrinho.id;
    if (dadosCarrinho) this.itens = dadosCarrinho.itens;
    this.precoTotal = this.precoTotal;
  }

  calcularValorTotal () {
    let precoTotal = 0;
    for(let item of this.itens) {
      precoTotal += item.precoTotal;
    }
    this.precoTotal = precoTotal;
  }


}
