import { MensagemService } from './../../../../plugins/forms/mensagem.service';
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
export class TorreConsultaComponent implements OnInit, OnDestroy, AfterViewInit {

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("TODOS");

  dados: ConsultaResponse<Torre>;

  filtro: any = {
    "ativo": ""
  };
  order: any = { "nome": "asc" };

  private inscricoes: Subscription[] = [];

  // Recupera o componente dataTable
  @ViewChild(DataTableComponent) dt: DataTableComponent<Torre>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private msg: MensagemService,
    private torreService: TorreService) { }


  ngOnInit() {
    console.log('Torre consulta componente');
  }

  ngAfterViewInit() {
    //
  }

  ngOnDestroy() {
    for (let s of this.inscricoes) {
      s.unsubscribe();
    }
  }

  novo() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  editar() {
    if (this.dt.getSelectedItem()) {
      this.router.navigate(['editar', this.dt.getSelectedItem().id], { relativeTo: this.route });
    } else {
      this.msg.nofiticationWarning('Nenhum item selecionado para alterar!');
    }
  }

  excluir() {
    if (this.dt.getSelectedItem()) {
      this.router.navigate(['excluir', this.dt.getSelectedItem().id], { relativeTo: this.route });
    } else {
      this.msg.nofiticationWarning('Nenhum item selecionado para excluir!');
    }
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
