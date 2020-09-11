import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'card-galeria',
  templateUrl: './card-galeria.component.html',
  styleUrls: ['./card-galeria.component.scss']
})
export class CardGaleriaComponent implements OnInit {

  @Input() produto:Produto;

  constructor() { }

  ngOnInit(): void {
  }

}
