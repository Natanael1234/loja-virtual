import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { CardGaleriaModule } from 'src/app/components/galeria/card-galeria/card-galeria.module';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ProdutosComponent],
  imports: [
    CommonModule,
    CardGaleriaModule,
    ProdutosRoutingModule,
    MatSnackBarModule
  ]
})
export class ProdutosModule { }
