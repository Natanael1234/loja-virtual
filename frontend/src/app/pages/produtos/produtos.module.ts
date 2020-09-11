import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { CardGaleriaModule } from 'src/app/components/galeria/card-galeria/card-galeria.module';
import { ProdutosRoutingModule } from './produtos-routing.module';

@NgModule({
  declarations: [ProdutosComponent],
  imports: [
    CommonModule,
    CardGaleriaModule,
    ProdutosRoutingModule
  ]
})
export class ProdutosModule { }
