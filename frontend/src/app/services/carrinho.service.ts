import { Injectable } from '@angular/core';
import { Carrinho } from '../models/carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  carrinho:Carrinho = new Carrinho();

  constructor() {

  }

}
