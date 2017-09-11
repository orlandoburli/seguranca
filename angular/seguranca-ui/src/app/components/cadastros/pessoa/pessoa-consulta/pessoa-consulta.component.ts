import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../pessoa.model';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';
import { EnumUtils } from './../../../../plugins/shared';
import { ConsultaResponse } from './../../../model/consulta-response.model';
import { DataPaginationEvent, SelectItemEvent } from './../../../../plugins/plugins.api';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { DataTableComponent } from './../../../../plugins/data-table/data-table.component';

declare var $: any;

@Component({
  selector: 'app-pessoa-consulta',
  templateUrl: './pessoa-consulta.component.html',
  styleUrls: ['./pessoa-consulta.component.css']
})
export class PessoaConsultaComponent implements OnDestroy, AfterViewInit {

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("TODOS");

  dados: ConsultaResponse<Pessoa>;

  // Evento para uso externo
  @Output() onPaginate: EventEmitter<SelectItemEvent<Pessoa>> = new EventEmitter();

  @Output() onSelectPessoa : EventEmitter<SelectItemEvent<Pessoa>> = new EventEmitter();

  @Output() onNovaPessoa : EventEmitter<SelectItemEvent<Pessoa>> = new EventEmitter();

  @Input() acessoLiberacao: boolean = false;

  filtro: any = {
    "ativo": ""
  };
  order: any = { "nome": "asc" };

  private inscricoes: Subscription[] = [];

  // Recupera o componente dataTable
  @ViewChild(DataTableComponent) dt: DataTableComponent<Pessoa>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private msg: MensagemService,
    private pessoaService: PessoaService) { }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    for (let s of this.inscricoes) {
      s.unsubscribe();
    }
  }

  novo() {
    if (!this.acessoLiberacao) {
      this.router.navigate(['novo'], { relativeTo: this.route });
    } else {
      this.onNovaPessoa.emit({ item : null });
    }
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
    let s = this.pessoaService.getList({
      filtro: this.filtro,
      order: this.order,
      pageSize: event.pageSize,
      pageNumber: event.page
    }).subscribe(dados => this.dados = dados);
  }

  getPageSize() : number {
    return this.acessoLiberacao ? 5 : 10;
  }

  selecionarPessoa () {
    let pessoa : Pessoa = this.dt.getSelectedItem();

    // Emite o evento de seleção de pessoa
    if (pessoa) {
      this.onSelectPessoa.emit({ item : pessoa });
    }
  }
}

