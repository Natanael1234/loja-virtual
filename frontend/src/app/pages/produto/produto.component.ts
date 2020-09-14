import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  public quantidade: number = 1;
  public produtoId: string;
  public produto: Produto;
  carregando: boolean = false;
  erro: string;

  imagemSelecionada:string;

  constructor(public snackBar:MatSnackBar, public location: Location, public router: Router, private route: ActivatedRoute, public carrinhoService: CarrinhoService, public produtoService: ProdutosService) { }

  ngOnInit(): void {
    this.produtoId = this.route.snapshot.paramMap.get('produtoId');
    this.buscarProduto();
  }

  async buscarProduto() {
    this.carrinhoService.getCarrinho();
    this.carregando = true;
    try {
      this.produto = await this.produtoService.getProdutoApi(this.produtoId);
      this.imagemSelecionada = this.produto?.imagens?.length ? this.produto.imagens[0] : null;
      this.erro = null;
    } catch (error) {
      this.erro = 'Falha ao buscar produto.';
    }
    this.carregando = false;
  }

  async comprar() {
    this.carregando == true;
    if (!this.produto) return;
    try {
      await this.carrinhoService.adicionarProduto(this.produto.id, 1);
      this.carregando = false;
      this.router.navigate(['/carrinho']);
    } catch (error) {
      let msg = error?.error?.message || 'Falha ao comprar.';
      this.erro = msg;
      this.mostrarMensagem(msg);
    }
    this.carregando = false;
  }

  voltar() {
    this.location.back();
  }

  mostrarMensagem (mensagem:string) {
    this.snackBar.open(mensagem, 'Ok', {
      duration: 5000,
    });
  }

  selecionarImagem (direcao:number) {
    let idx = this.produto?.imagens?.findIndex(img=>img==this.imagemSelecionada);
    let numImages = this.produto?.imagens?.length || 0;
    if (numImages) {

      if (direcao < 0) {
        if (idx <= 0) {
          idx = numImages - 1;
        } else {
          idx--;
        }
      }
      else if (direcao > 0) {
        if (idx <= numImages - 2) {
          idx++;
        } else {
          idx = 0;
        }
      }

      try {
        this.imagemSelecionada = this.produto.imagens[idx];
      } catch (error) {

      }
    }
  }


}
