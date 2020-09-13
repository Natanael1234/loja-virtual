export class Produto {

  id: string;
  nome: string;
  thumbnail: string;
  preco: number = 0;
  imagens: string[];
  descricao: string;
  quantidadeEstoque:number = 0;

  constructor(dadosProduto?: any) {
    if (dadosProduto) {
      this.setDados(dadosProduto)
    }
  }

  setDados(dadosProduto?: any) {
    this.id = dadosProduto.id;
    this.nome = dadosProduto.nome;
    this.thumbnail = dadosProduto.thumbnail;
    this.preco = dadosProduto.preco || 0;
    this.descricao = dadosProduto.descricao;
    this.imagens = dadosProduto.imagens;
    this.quantidadeEstoque = dadosProduto.quantidadeEstoque;
  }

}
