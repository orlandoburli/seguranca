import { EnumUtils } from './../../../../plugins/shared';
import { DataPaginationEvent } from './../../../../plugins/plugins.api';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { DataTableComponent } from './../../../../plugins/data-table/data-table.component';
import { Torre } from './../torre.model';
import { ConsultaResponse } from './../../../model/consulta-response.model';
import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { TorreService } from './../torre.service';

declare var $: any;

@Component({
  selector: 'app-torre-consulta',
  templateUrl: './torre-consulta.component.html',
  styleUrls: ['./torre-consulta.component.scss']
})
export class TorreConsultaComponent implements OnDestroy, AfterViewInit {

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("TODOS");

  dados: ConsultaResponse<Torre>;

  filtro: any = {
    "ativo": ""
  };
  order: any = { "nome": "asc" };

  private inscricoes: Subscription[] = [];

  // Recupera o componente dataTable
  @ViewChild(DataTableComponent) dt: DataTableComponent;

  constructor(private route: ActivatedRoute, private router: Router, private torreService: TorreService) { }

  ngAfterViewInit() {
    $("#internal_nome").focus();
  }

  ngOnDestroy() {
    for (let s of this.inscricoes) {
      s.unsubscribe();
    }
  }

  novo() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  editar(v: Torre) {
    this.router.navigate(['editar', v.id], { relativeTo: this.route });
  }

  excluir(v: Torre) {
    this.router.navigate(['excluir', v.id], { relativeTo: this.route });
  }

  pesquisar() {
    this.dt.load(1);
  }

  limpar() {
    this.filtro = {
      "ativo": ""
    };
    this.pesquisar();
  }

  paginacao(event: DataPaginationEvent) {
    let s = this.torreService.getList({
      filtro: this.filtro,
      order: this.order,
      pageSize: event.pageSize,
      pageNumber: event.page
    }).subscribe(dados => this.dados = dados);
  }

}
