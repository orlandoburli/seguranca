import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-excluir',
  template: `<button class="btn btn-wd btn-danger btn-fill btn-block btn-magnify" type="button" [style.marginTop.px]="marginTop"><span class="btn-label"><i class="fa fa-trash"></i></span> {{ text }}</button>`
})
export class BotaoExcluirComponent implements OnInit {

  @Input() text: string = "Excluir";

  @Input() marginTop: number = 0;

  constructor() { }

  ngOnInit() {
  }
}
