import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrlPipeModule } from 'src/app/pipes/brl/brl.module';
import { MatCardModule } from '@angular/material/card';
import { CardGaleriaComponent } from './card-galeria.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardGaleriaComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    BrlPipeModule,
    RouterModule
  ],
  exports: [
    CardGaleriaComponent
  ]
})
export class CardGaleriaModule { }
