import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrlPipe } from './brl.pipe';



@NgModule({
  declarations: [BrlPipe],
  imports: [
    CommonModule
  ],
  exports: [
    BrlPipe
  ]
})
export class BrlPipeModule { }
