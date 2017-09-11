import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-salvar',
  template: `<button class="btn btn-h btn-block blue-steel" type="button"><i class="fa fa-save"></i> {{ text }}</button>`
})
export class BotaoSalvarComponent implements OnInit {

  @Input() text: string = "Salvar";

  constructor() { }

  ngOnInit() {
  }
}
