import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-novo',
  template: `<button class="btn btn-h btn-block btn-default" type="button"><i class="fa fa-plus-square"></i> {{ text }}</button>`
})
export class BotaoNovoComponent implements OnInit {

  @Input() text: string = "Cadastrar Novo";

  constructor() { }

  ngOnInit() {
  }
}
