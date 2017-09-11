import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-pesquisar',
  template: `<button class="btn btn-h btn-block blue-steel" type="button"><i class="fa fa-search"></i> {{ text }}</button>`
})
export class BotaoPesquisarComponent implements OnInit {

  @Input() text: string = "Pesquisar";

  constructor() { }

  ngOnInit() {
  }
}
