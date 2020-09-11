import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';
import { BrlPipeModule } from 'src/app/pipes/brl/brl.module';


@NgModule({
  declarations: [ProdutoComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    BrlPipeModule
  ]
})
export class ProdutoModule { }
