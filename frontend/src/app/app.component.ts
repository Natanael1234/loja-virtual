import { Component } from '@angular/core';
import { CarrinhoService } from './services/carrinho.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor (public carrinhoService: CarrinhoService) {

    }

}
