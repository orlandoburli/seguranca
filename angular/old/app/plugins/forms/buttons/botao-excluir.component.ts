import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-excluir',
  template: `<button class="btn btn-h btn-block red" type="button"><i class="fa fa-trash"></i> {{ text }}</button>`
})
export class BotaoExcluirComponent implements OnInit {

  @Input() text: string = "Excluir";

  constructor() { }

  ngOnInit() {
  }
}
