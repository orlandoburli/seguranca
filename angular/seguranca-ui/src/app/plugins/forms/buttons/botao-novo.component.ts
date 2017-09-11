import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-novo',
  template: `<button class="btn btn-h btn-fill btn-block btn-success btn-magnify" type="button" [style.marginTop.px]="marginTop"><i class="fa fa-plus-square"></i> {{ text }}</button>`
})
export class BotaoNovoComponent implements OnInit {

  @Input() text: string = "Novo";

  @Input() marginTop: number = 0;

  constructor() { }

  ngOnInit() {
  }
}
