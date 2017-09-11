import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-voltar',
  template: `<button class="btn btn-info btn-fill btn-block btn-wd btn-magnify" type="button"><i class="fa fa-history"></i> {{ text }}</button>`
})
export class BotaoVoltarComponent implements OnInit {

  @Input() text: string = "Voltar";

  constructor() { }

  ngOnInit() {
  }
}
