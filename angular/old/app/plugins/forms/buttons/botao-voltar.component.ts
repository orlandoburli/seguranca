import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-voltar',
  template: `<button class="btn btn-h btn-block purple-soft" type="button"><i class="fa fa-history"></i> {{ text }}</button>`
})
export class BotaoVoltarComponent implements OnInit {

  @Input() text: string = "Voltar";

  constructor() { }

  ngOnInit() {
  }
}
