import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { PortaService } from './../porta.service';
import { Porta } from './../porta.model';
import { EnumUtils } from './../../../../plugins/shared';
import { ConsultaResponse } from './../../../model/consulta-response.model';
import { DataPaginationEvent } from './../../../../plugins/plugins.api';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { DataTableComponent } from './../../../../plugins/data-table/data-table.component';

@Component({
  selector: 'app-porta-consulta',
  templateUrl: './porta-consulta.component.html',
  styleUrls: ['./porta-consulta.component.scss']
})
export class PortaConsultaComponent implements OnDestroy, AfterViewInit {

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("TODOS");
  itensTipoPorta: SelectGroupOption[] = EnumUtils.getOptionsTipoPorta("TODOS");

  dados: ConsultaResponse<Porta>;

  filtro: any = {
    "ativo": "",
    "tipo": ""
  };
  order: any = { "nome": "asc" };

  private inscricoes: Subscription[] = [];

  // Recupera o componente dataTable
  @ViewChild(DataTableComponent) dt: DataTableComponent;

  constructor(private route: ActivatedRoute, private router: Router, private portaService: PortaService) { }

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

  editar(v: Porta) {
    this.router.navigate(['editar', v.id], { relativeTo: this.route });
  }

  excluir(v: Porta) {
    this.router.navigate(['excluir', v.id], { relativeTo: this.route });
  }

  pesquisar() {
    this.dt.load(1);
  }

  limpar() {
    this.filtro = {
      "ativo": "",
      "tipo": ""
    };
    this.pesquisar();
  }

  paginacao(event: DataPaginationEvent) {
    let s = this.portaService.getList({
      filtro: this.filtro,
      order: this.order,
      pageSize: event.pageSize,
      pageNumber: event.page
    }).subscribe(dados => this.dados = dados);
  }

}
