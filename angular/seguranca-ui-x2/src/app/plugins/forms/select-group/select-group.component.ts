import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Component, OnInit, Input, Output, Host, EventEmitter, forwardRef, ElementRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { SelectGroupOption } from './select-group-option';
import { Utils } from './../../shared';

// Função sem conteudo, apenas para nao dar null pointer no call das referencias.
const noop = () => {
};

declare var $: any;

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
export class SelectGroupComponent implements OnInit, AfterViewInit {

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

  // URL para o select2 fazer a pesquisa (padrao REST)
  @Input() urlSearch: string = "";

  // Quando usado o padrao REST com urlSearch, este campo diz o tamanho máximo de páginas a serem trazidas.
  @Input() maxResults: number = 10;

  // Value interno (ngModel)
  private innerValue: any = '';

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // Id do componente select
  @Input("id") componentId: string;

  // Evento disparado no "change" do input
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef, private _http: Http) { }

  ngAfterViewInit() { }

  ngOnInit() {
    let _urlSearch = this.urlSearch;
    let _maxResults = this.maxResults;

    if (this.urlSearch && this.urlSearch != "") {
      $(this.el.nativeElement).find("select").select2({
        placeholder: this.help,
        lang: "pt-BR",
        width: '100%',
        minimumInputLength: 1,
        ajax: {
          // url: this.urlSearch,
          url: function (params) {
            return _urlSearch + '?q=' + params.term + '&page=' + (params.page || 1) + '&pageSize=' + _maxResults;
          },

          method: "POST",
          dataType: 'json',

          initSelection: function (element, callback) {
            var data = [];
            $(element.val()).each(function () {
              data.push({ id: this, text: this });
            });

            callback(data);
          },

          // delay: 250,
          data: function (params) {
            params.page = params.page || 1;

            return {
              q: params.term, // search term
              page: params.page,
              pageSize: _maxResults
            };
          },
          current: {

          },
          processResults: function (data, params) {
            params.page = params.page || 1;

            return {
              results: data.lista,
              more: (params.page * _maxResults) < data.total,
              pagination: {
                more: (params.page * _maxResults) < data.total
              }
            };
          },
          cache: false
        },

      });
    } else {
      $(this.el.nativeElement).find("select").select2({
        placeholder: this.help,
        lang: "pt-BR",
        width: '100%'
      });
    }

    $(this.el.nativeElement).find("select").on("change", () => {
      let v = $(this.el.nativeElement).find("select").val();
      this.innerValue = v;
      this.onChangeCallback(v);
    });
  }

  getData() {
    let opt = [];

    this.options.forEach(element => {
      opt.push({ id: element.value, text: element.label });
    });

    return opt;
  }

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  private select2Value(value: any) {
    if (this.urlSearch && value && value != "") {
      let find = false;
      if (!find) {
        // Chama o servico para fazer a pesquisa
        // cria uma instância de Headers
        let headers = new Headers();
        // Adiciona o tipo de conteúdo application/json
        headers.append('Content-Type', 'application/json');

        let s = this._http.post(this.urlSearch + "?id=" + value,
          { headers: headers })
          .map(res => res.json())
          .catch((error: any) => Observable.throw(error.json() || 'Server error'))
          .subscribe((data) => {
            if (data && data.lista && data.lista.length > 0) {
              let item = data.lista[0];
              $(this.el.nativeElement).find("select").append('<option selected value="' + item.id + '">' + item.text + '</option>');
            }
          });

        // TODO lembrar de cancelar a subscription
      }
    } else {
      $(this.el.nativeElement).find("select").val(value).trigger("change");
    }
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);

      // Set value
      this.select2Value(this.innerValue);
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;

      // Set value
      this.select2Value(this.innerValue);
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
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
