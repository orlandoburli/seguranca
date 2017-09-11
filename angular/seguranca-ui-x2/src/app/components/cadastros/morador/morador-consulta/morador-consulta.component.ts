import { MoradorService } from './../morador.service';
import { Morador } from './../morador.model';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';
import { EnumUtils } from './../../../../plugins/shared';
import { ConsultaResponse } from './../../../model/consulta-response.model';
import { DataPaginationEvent } from './../../../../plugins/plugins.api';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { DataTableComponent } from './../../../../plugins/data-table/data-table.component';
import { UnidadeService } from "app/components/cadastros/unidade/unidade.service";

@Component({
  selector: 'app-morador-consulta',
  templateUrl: './morador-consulta.component.html',
  styleUrls: ['./morador-consulta.component.css']
})
export class MoradorConsultaComponent implements OnDestroy, AfterViewInit {

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("TODOS");
  itensUnidades: SelectGroupOption[] = [];

  dados: ConsultaResponse<Morador>;

  filtro: any = {};
  order: any;

  private inscricoes: Subscription[] = [];

  @Input() acessoLiberacao: boolean = false;

  // Recupera o componente dataTable
  @ViewChild(DataTableComponent) dt: DataTableComponent<Morador>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private msg: MensagemService,
    private unidadeService: UnidadeService,
    private moradorService: MoradorService) { }

  ngAfterViewInit() {
  }

  ngOnInit() {
    let s = this.unidadeService.getListAtivos().subscribe((retorno) => {
      this.itensUnidades.push({ label: "Selecione a unidade", value: "" });

      for (let unidade of retorno.lista) {
        this.itensUnidades.push({ label: unidade.numero, value: unidade.id.toString() });
      }
    });

    this.inscricoes.push(s);
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
    let s = this.moradorService.getList({
      filtro: this.filtro,
      order: this.order,
      pageSize: event.pageSize,
      pageNumber: event.page
    }).subscribe(dados => this.dados = dados);
  }

}

