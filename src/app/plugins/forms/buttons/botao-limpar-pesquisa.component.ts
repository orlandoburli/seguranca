import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-limpar-pesquisa',
  template: `<button class="btn btn-h btn-block red" type="button"><i class="fa fa-eraser"></i> {{ text }}</button>`
})
export class BotaoLimparPesquisaComponent implements OnInit {

  @Input() text: string = "Limpar pesquisa";

  constructor() { }

  ngOnInit() {
  }
}
