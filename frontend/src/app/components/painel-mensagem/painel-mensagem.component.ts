import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'painel-mensagem',
  templateUrl: './painel-mensagem.component.html',
  styleUrls: ['./painel-mensagem.component.scss']
})
export class PainelMensagemComponent implements OnInit {

  @Input() texto:string;
  @Input() textoLink:string;
  /**
   Ex.: ['/produto', '5']
   */
  @Input() link:any[];

  public constructor() { }

  ngOnInit(): void {
  }

}
