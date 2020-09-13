import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';
import { BrlPipeModule } from 'src/app/pipes/brl/brl.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AssetsDirPipeModule } from 'src/app/pipes/assets-dir/asstes-dir.module';


@NgModule({
  declarations: [ProdutoComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    RouterModule,
    BrlPipeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    AssetsDirPipeModule,
    MatSnackBarModule
  ]
})
export class ProdutoModule { }
