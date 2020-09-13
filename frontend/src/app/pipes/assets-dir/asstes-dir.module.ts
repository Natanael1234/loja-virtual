import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsDirPipe } from './assets-dir.pipe';

@NgModule({
  declarations: [AssetsDirPipe],
  imports: [CommonModule],
  exports: [AssetsDirPipe]
})
export class AssetsDirPipeModule { }
