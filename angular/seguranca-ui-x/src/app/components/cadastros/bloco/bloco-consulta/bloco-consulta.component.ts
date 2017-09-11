import { EnumUtils } from './../../../../plugins/shared';
import { ConsultaResponse } from './../../../model/consulta-response.model';
import { DataPaginationEvent } from './../../../../plugins/plugins.api';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Bloco } from './../bloco.model';
import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { BlocoService } from './../bloco.service';
import { DataTableComponent } from './../../../../plugins/data-table/data-table.component';

declare var $: any;

@Component({
  selector: 'app-bloco-consulta',
  templateUrl: './bloco-consulta.component.html',
  styleUrls: ['./bloco-consulta.component.scss']
})
export class BlocoConsultaComponent implements OnDestroy, AfterViewInit {

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("TODOS");

  dados: ConsultaResponse<Bloco>;

  filtro: any = {
    "ativo": ""
  };
  order: any = { "nome": "asc" };

  private inscricoes: Subscription[] = [];

  // Recupera o componente dataTable
  @ViewChild(DataTableComponent) dt: DataTableComponent;

  constructor(private route: ActivatedRoute, private router: Router, private blocoService: BlocoService) { }

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

  editar(v: Bloco) {
    this.router.navigate(['editar', v.id], { relativeTo: this.route });
  }

  excluir(v: Bloco) {
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
    let s = this.blocoService.getList({
      filtro: this.filtro,
      order: this.order,
      pageSize: event.pageSize,
      pageNumber: event.page
    }).subscribe(dados => this.dados = dados);
  }

}
