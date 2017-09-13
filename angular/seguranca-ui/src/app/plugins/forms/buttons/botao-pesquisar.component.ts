import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-pesquisar',
  template: `<button class="btn btn-wd btn-warning btn-fill btn-block btn-magnify" type="button" [style.marginTop.px]="marginTop"> <span class="btn-label"><i class="ti-search"></i></span> {{ text }}</button>`,
  styles : [`

  `]
})
export class BotaoPesquisarComponent implements OnInit {

  @Input() text: string = "Pesquisar";

  @Input() marginTop : number = 0;

  constructor() { }

  ngOnInit() {
  }
}
