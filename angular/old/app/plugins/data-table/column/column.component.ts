import { Inject, forwardRef, Component, OnInit, Input, ViewChildren, ElementRef, TemplateRef, ContentChild, ViewContainerRef } from '@angular/core';

import { DataTableComponent } from './../data-table.component';

@Component({
  selector: 'column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {

  // Field aonde será buscado o dado para a coluna
  @Input() field: string;

  // Cabeçalho da coluna
  @Input() header: string;

  // Indica se quer usar template para a coluna (não usa o field, mas a tag <template>)
  @Input() useTemplate: boolean = false;

  // Tamanho da coluna, de 1 a 12 (padrao bootstrap)
  @Input() width: number;

  // Alinhamento da coluna (dados)
  @Input() alignment: string = "left";

  // Alinhamento da coluna (cabecalho)
  @Input() alignmentHeader: string = "left";

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  constructor( @Inject(forwardRef(() => DataTableComponent)) private dt: DataTableComponent) {

  }

  /**
   * Retorna a classe Css de alinhamento
   */
  getAlingmentString(alignment: string) {
    switch (alignment) {
      case ("left"): {
        return "text-left";
      }
      case ("center"): {
        return "text-center";
      }
      case ("right"): {
        return "text-right";
      }
    }
    return "";
  }

}
