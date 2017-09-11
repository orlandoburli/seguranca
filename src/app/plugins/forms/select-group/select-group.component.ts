import { Component, OnInit, Input, Output, Host, EventEmitter, forwardRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { SelectGroupOption } from './select-group-option';
import { Utils } from './../../shared';

// Função sem conteudo, apenas para nao dar null pointer no call das referencias.
const noop = () => {
};

export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectGroupComponent),
  multi: true
};

@Component({
  selector: 'select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.scss'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR]
})
export class SelectGroupComponent implements OnInit {

  // Texto de ajuda, exibido abaixo do input
  @Input() help: string;

  // Texto do label exibido acima do input
  @Input() label: string;

  // Largura , de 1 a 12, para o grid system.
  @Input() width: number = 3;

  // Itens da combo
  @Input() options: SelectGroupOption[] = [];

  // Indica se o input estará desabilitado
  @Input() disabled: boolean = false;

  // Value interno (ngModel)
  private innerValue: any = '';

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // Id do componente select
  @Input("id") componentId: string;

  // Evento disparado no "change" do input
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // $(this.el.nativeElement).find("select").select2();
  }

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  getDisabledString() {
    return this.disabled ? ' disabled="disabled" ' : '';
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
