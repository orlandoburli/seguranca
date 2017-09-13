import { MensagemService } from './../../../../plugins/forms/mensagem.service';
import { EnumUtils } from './../../../../plugins/shared';
import { Component, OnInit, ViewChild, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DataTableComponent } from './../../../../plugins/data-table/data-table.component';
import { ConsultaRequest } from './../../../model/consulta-request.model';

import { DataPaginationEvent } from './../../../../plugins/plugins.api';

import { ConsultaResponse } from './../../../model/consulta-response.model';

import { UnidadeService } from './../unidade.service';
import { TorreService } from './../../torre/torre.service';
import { BlocoService } from './../../bloco/bloco.service';

import { Bloco } from './../../bloco/bloco.model';
import { Unidade } from './../unidade.model';
import { Torre } from './../../torre/torre.model';

declare var $: any;

@Component({
  selector: 'app-unidade-consulta',
  templateUrl: './unidade-consulta.component.html',
  styleUrls: ['./unidade-consulta.component.scss']
})
export class UnidadeConsultaComponent implements OnInit, OnDestroy, AfterViewInit {

  // Listas de Retorno
  dados: ConsultaResponse<Unidade>;
  blocos: ConsultaResponse<Bloco>;
  torres: ConsultaResponse<Torre>;

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("TODOS");
  itensTorres: SelectGroupOption[];
  itensBlocos: SelectGroupOption[];

  filtro: any = {
    "ativo": "",
    "torre$id": "",
    "bloco$id": ""
  };
  order: any = { "torre.nome": "asc", "numero": "asc" };

  inscricaoServico: Subscription;

  // Recupera o componente dataTable
  @ViewChild(DataTableComponent) dt: DataTableComponent<Unidade>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private msg : MensagemService,
    private unidadeService: UnidadeService,
    private blocoService: BlocoService,
    private torreService: TorreService) { }

  ngOnInit() {

    this.itensBlocos = [];

    // Busca lista de blocos ativos
    this.blocoService.getListAtivos().subscribe(retorno => {
      this.itensBlocos = [{ label: "TODOS" }];

      this.blocos = retorno

      for (let bloco of this.blocos.lista) {
        this.itensBlocos.push({ label: bloco.nome, value: bloco.id.toString() });
      }
    });

    // Busca de torres ativas
    this.torreService.getListAtivos().subscribe(retorno => {
      this.itensTorres = [{ label: "TODOS" }];

      this.torres = retorno;

      for (let torre of this.torres.lista) {
        this.itensTorres.push({ label: torre.nome, value: torre.id.toString() });
      }
    });
  }

  ngAfterViewInit() {
    $("#internal_numero").focus();
  }

  ngOnDestroy() {
    if (this.inscricaoServico)
      this.inscricaoServico.unsubscribe();
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
      "ativo": "",
      "torre$id": "",
      "bloco$id": ""
    };
    this.pesquisar();
  }

  paginacao(event: DataPaginationEvent) {
    this.inscricaoServico = this.unidadeService.getList({
      filtro: this.filtro,
      order: this.order,
      pageSize: event.pageSize,
      pageNumber: event.page
    }).subscribe(dados => this.dados = dados);
  }
}
