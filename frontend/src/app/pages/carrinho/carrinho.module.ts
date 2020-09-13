import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CarrinhoRoutingModule } from './carrinho-routing.module';
import { CarrinhoComponent } from './carrinho.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PainelMensagemModule } from 'src/app/components/painel-mensagem/painel-mensagem.module';



@NgModule({
  declarations: [CarrinhoComponent],
  imports: [
    CommonModule,
    CarrinhoRoutingModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    PainelMensagemModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule
  ]
})
export class CarrinhoModule { }
