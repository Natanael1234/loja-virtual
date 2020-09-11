import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brl'
})
export class BrlPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    return value.toLocaleString('pt-br', {style:'currency', currency:'BRL'});
  }

}
