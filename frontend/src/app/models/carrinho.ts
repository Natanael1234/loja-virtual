import { ItemCarrinho } from './item-carrinho';
import { Produto } from './produto';

export class Carrinho {

  itens: ItemCarrinho[] = [];
  precoTotal: number = 0;
  formaPagamento: number;

  /**
   * Remove todos os itens do carrinho.
   */
  esvaziarCarrinho () {
    this.itens = [];
  }

  /**
   * Adciona um produto no carrinho.
   * @param produto produto a ser adicionado.
   * @param quantidade quantidade do produto a ser adicionada.
   */
  adicionarItem (produto:Produto, quantidade: number) {
    if (!produto?.id) throw new Error('Produto indefinido');
    let item = this.getItemPorProdutoId(produto.id);
    if (!item) {
      item = new ItemCarrinho(produto, quantidade);
      this.itens.push(item);
    } else {
      item.mudaQuantidade(quantidade);
    }
    this.calcularValorTotal();
  }

  /**
   * Remove um Ítem do Carrinho.
   * @param produtoId id do Produto.
   */
  removerItem (produtoId:string) {
    if (produtoId) throw new Error('Produto indefinido');
    let idx = this.getItemIndexPorProdutoId(produtoId);
    this.itens.splice(idx, 1);
    this.calcularValorTotal();
    return idx > -1;
  }

  /**
   * Busca um ítem do Carrinho pelo id de seu Produto.
   * @param produtoId id do Produto.
   */
  getItemPorProdutoId (produtoId:string) {
    if (!produtoId) return null;
    return this.itens.find((item:ItemCarrinho)=>{
      return item?.produto?.id == produtoId;
    });
  }

  /**
   * Obtém o índice de um Ítem do Carrinho pelo id de seu Produto.
   * @param produtoId id do Produto.
   */
  getItemIndexPorProdutoId (produtoId:string) {
    if (!produtoId) return null;
    return this.itens.findIndex((item:ItemCarrinho)=>{
      return item?.produto?.id == produtoId;
    });
  }

  calcularValorTotal () {
    let precoTotal = 0;
    for(let item of this.itens) {
      precoTotal += item.precoTotal;
    }
    this.precoTotal = precoTotal;
  }

}
