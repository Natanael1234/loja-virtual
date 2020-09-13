import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Pipe({
  name: 'assetsDir'
})
export class AssetsDirPipe implements PipeTransform {

  constructor (public api:ApiService) {

  }

  transform(relativePath: string, ...args: unknown[]): unknown {
    return this.api.baseUrl + relativePath;
  }

}
