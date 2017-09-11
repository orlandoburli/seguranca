import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  @Input() titulo: string;

  @Input() title: string;

  @Input("sub-titulo") subTitulo: string;

  @Input("subTitle") subTitle: string;

  @Input("icon") classIcon: string;

  @Input() id: string;

  constructor() { }

  ngOnInit() {
  }

  getTitulo() {
    return this.title || this.titulo;
  }

  getSubTitulo() {
    return this.subTitle || this.subTitulo;
  }
}
