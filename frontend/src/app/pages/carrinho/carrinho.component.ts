import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from 'src/app/models/item-carrinho';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  public carregando: boolean = false;
  public erro: string;
  public concluido: boolean = false;

  constructor(public snackBar:MatSnackBar, public location:Location, public carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.buscarCarrinho();
  }

  async buscarCarrinho () {
    this.carregando = true;
    try {
      await this.carrinhoService.getCarrinho();
    } catch (error) {
      this.mostrarMensagem(error?.error?.message || 'Falha ao buscar carrinho.');
    }
    this.carregando = false;
  }

  async adicionarQuantidade(item: ItemCarrinho, quantidade: number) {
    try {
      await this.carrinhoService.adicionarProduto(item?.produto?.id, quantidade);
    } catch (error) {
      this.mostrarMensagem(error?.error?.message || 'Falha ao mudar quantidade.')
    }
  }

  async esvaziarCarrinho() {
    this.carregando = true;
    try {
      await this.carrinhoService.esvaziar();
    } catch (error) {
      this.mostrarMensagem(error?.error?.message || 'Falha ao esvaziar carrinho.');
    }
    this.carregando = false;
  }

  async removerItem(item: ItemCarrinho) {
    this.carregando = true;
    try {
      await this.carrinhoService.deletarItem(item.produto.id);
    } catch (error) {
      this.mostrarMensagem(error?.error?.message || 'Falha ao remover item.');
    }
    this.carregando = false;
  }

  async comprar() {
    this.carregando = true;
    try {
      await this.carrinhoService.comprar();
      this.concluido = true;
    } catch (error) {
      this.erro = error?.error?.message;
      this.mostrarMensagem(error?.error?.message || 'Falha ao concluir compra.');
    }
    this.carregando = false;
  }

  voltar() {
    this.location.back();
  }

  mostrarMensagem (mensagem:string) {
    this.snackBar.open(mensagem, 'Ok', {
      duration: 5000
    });
  }

}
