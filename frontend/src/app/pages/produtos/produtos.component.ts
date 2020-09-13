import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from 'src/app/models/produto';
import { CarrinhoService } from 'src/app/services/carrinho.service';
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

  constructor(public snackBar:MatSnackBar, public produtoService: ProdutosService, public carrinhoService:CarrinhoService) {

  }

  ngOnInit(): void {
    this.buscaProdutos();
  }

  async buscaProdutos () {
    this.carregando = true;
    this.carrinhoService.getCarrinho();
    try {
      this.produtos = await this.produtoService.getProdutosApi();
    } catch (error) {
      this.erro = error.message || 'Erro ao buscar produtos';
      this.produtos = [];
    }
    this.carregando = false;
  }

  mostrarMensagem (mensagem:string) {
    this.snackBar.open(mensagem, 'Ok', {
      duration: 5000,
    });
  }

}
