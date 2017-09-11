import { VeiculoService } from './../veiculo.service';
import { Veiculo } from './../veiculo.model';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';
import { EnumUtils } from './../../../../plugins/shared';
import { ConsultaResponse } from './../../../model/consulta-response.model';
import { DataPaginationEvent } from './../../../../plugins/plugins.api';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { DataTableComponent } from './../../../../plugins/data-table/data-table.component';

@Component({
  selector: 'app-veiculo-consulta',
  templateUrl: './veiculo-consulta.component.html',
  styleUrls: ['./veiculo-consulta.component.css']
})
export class VeiculoConsultaComponent implements OnDestroy, AfterViewInit {

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("TODOS");

  dados: ConsultaResponse<Veiculo>;

  filtro: any = {
    "ativo": ""
  };
  order: any = { "morador.pessoa.nome": "asc", "placa" : "asc" };

  private inscricoes: Subscription[] = [];

  // Recupera o componente dataTable
  @ViewChild(DataTableComponent) dt: DataTableComponent<Veiculo>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private msg: MensagemService,
    private veiculoService: VeiculoService) { }

  ngAfterViewInit() {
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
    let s = this.veiculoService.getList({
      filtro: this.filtro,
      order: this.order,
      pageSize: event.pageSize,
      pageNumber: event.page
    }).subscribe(dados => this.dados = dados);
  }
}
