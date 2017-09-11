import { Utils, EnumUtils } from './../../../../plugins/shared';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { TorreService } from './../../torre/torre.service';
import { BlocoService } from './../../bloco/bloco.service';
import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { Torre } from './../../torre/torre.model';
import { Bloco } from './../../bloco/bloco.model';
import { Unidade } from './../unidade.model';
import { ConsultaResponse } from './../../../model/consulta-response.model';
import { UnidadeService } from './../unidade.service';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';
import { AbstractCadastroComponent } from '../../../geral/crud/abstract-cadastro.component';

@Component({
  selector: 'app-unidade-cadastro',
  templateUrl: './unidade-cadastro.component.html',
  styleUrls: ['./unidade-cadastro.component.scss']
})
export class UnidadeCadastroComponent extends AbstractCadastroComponent<Unidade, UnidadeService> {

  blocos: ConsultaResponse<Bloco>;
  torres: ConsultaResponse<Torre>;

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo();
  itensTorres: SelectGroupOption[] = [];
  itensBlocos: SelectGroupOption[] = [];

  constructor(
    private unidadeService: UnidadeService,
    private route: ActivatedRoute,
    private router: Router,
    private blocoService: BlocoService,
    private torreService: TorreService,
    private msg: MensagemService) {
    super(route, router, msg);
  }

  ngOnInit() {
    this.itensBlocos = [];

    // Busca lista de blocos ativos
    let s1 = this.blocoService.getListAtivos().subscribe(retorno => {
      this.itensBlocos = [{ label: "SELECIONE UM BLOCO" }];

      this.blocos = retorno;

      for (let bloco of this.blocos.lista) {
        this.itensBlocos.push({ label: bloco.nome, value: bloco.id.toString() });
      }
    });

    this.inscricoes.push(s1);

    // Busca de torres ativas
    let s2 = this.torreService.getListAtivos().subscribe(retorno => {
      this.itensTorres = [{ label: "SELECIONE UMA TORRE" }];

      this.torres = retorno;

      for (let torre of this.torres.lista) {
        this.itensTorres.push({ label: torre.nome, value: torre.id.toString() });
      }

    });

    this.inscricoes.push(s2);

    super.ngOnInit();
  }

  getService(): UnidadeService {
    return this.unidadeService;
  }

  getVoNewInstance(): Unidade {
    return Unidade.getInstance();
  }
}
