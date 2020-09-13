import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelMensagemComponent } from './painel-mensagem.component';
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [PainelMensagemComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  exports:[PainelMensagemComponent]
})
export class PainelMensagemModule { }
