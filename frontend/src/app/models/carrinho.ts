import { ItemCarrinho } from './item-carrinho';
import { Produto } from './produto';

export class Carrinho {

  itens: ItemCarrinho[] = [];
  quantidadeTotal = 0;
  precoTotal: number = 0;
  formaPagamento: number;


  comprar () {
    this.esvaziarCarrinho();
  }

  /**
   * Remove todos os itens do carrinho.
   */
  esvaziarCarrinho () {
    this.itens = [];
    this.calcularTotais();
  }

  /**
   *
   * @param item muda a quantidade de um item no carrinho.
   * @param quantidade quantidade.
   */
  setQuantidade (item: ItemCarrinho, quantidade:number) {
    item.definirQuantidade(quantidade);
    this.calcularTotais();
  }

  setItem (produto:Produto, quantidade:number) {
    if (!produto?.id) throw new Error('Produto indefinido');
    let item = this.getItemPorProdutoId(produto.id);
    if (!item) {
      item = new ItemCarrinho(produto, quantidade);
      this.itens.push(item);
    } else {
      item.setProduto(produto);
      item.definirQuantidade(quantidade);
    }
    this.calcularTotais();
  }

  /**
   * Adiciona um produto no carrinho.
   * @param produto produto a ser adicionado.
   * @param quantidade quantidade do produto a ser adicionada.
   */
  adicionarProduto (produto:Produto) {
    if (!produto?.id) throw new Error('Produto indefinido');
    let item = this.getItemPorProdutoId(produto.id);
    if (!item) {
      item = new ItemCarrinho(produto, 1);
      this.itens.push(item);
    } else {
      item.incrementarQuantidade(1);
    }
    this.calcularTotais();
  }

  /**
   * Remove um Ítem do Carrinho.
   * @param produtoId id do Produto.
   */
  removerItem (produtoId:string) {
    if (produtoId) throw new Error('Produto indefinido');
    let idx = this.getItemIndexPorProdutoId(produtoId);
    this.itens.splice(idx, 1);
    this.calcularTotais();
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

  /**
   * Calcula quantidade e valor totais.
   */
  async calcularTotais() {
    this.calcularQuantidadeTotal();
    this.calcularValorTotal();
  }

  /**
   * Calcular o valor total no carrinho.
   */
  async calcularValorTotal () {
    let precoTotal = 0;
    for(let item of this.itens) {
      precoTotal += item.precoTotal;
    }
    this.precoTotal = precoTotal;
  }

  /**
   * Calcular a quantidade total de produtos de todos os itens no carrinho.
   */
  async calcularQuantidadeTotal () {
    let quantidadeTotal = 0;
    for(let item of this.itens) {
      quantidadeTotal += item.quantidade;
    }
    this.quantidadeTotal = quantidadeTotal;
  }


}
