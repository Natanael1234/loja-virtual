import { Produto } from './produto';

export class ItemCarrinho {

  id:string;
  quantidade:number;
  produtoId:string;
  precoTotal:number;
  produto: Produto;

  constructor(dadosItem?: any) {
    if (dadosItem) {
      this.setDados(dadosItem)
    }
  }

  setDados (dadosItem?:any) {
    this.id = dadosItem.id;
    this.quantidade = dadosItem.quantidade;
    this.produtoId = dadosItem.produtoId;
    this.produto = dadosItem.produto ? new Produto(dadosItem.produto) : null;
    this.precoTotal = dadosItem.precoTotal;
  }

}
