import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos=[];
  carregando: boolean = false;
  erro: string;

  constructor(public produtoService: ProdutosService) {

  }

  ngOnInit(): void {
    this.buscaProdutos();
  }

  async buscaProdutos () {
    try {
      this.carregando = true;
      this.produtos = await this.produtoService.getProdutos();
    } catch (error) {
      this.erro = error.message || 'Erro ao buscar produtos';
      this.produtos = [];
    }
    this.carregando = false;
  }

}
