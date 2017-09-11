import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { Utils, EnumUtils } from './../../../../plugins/shared';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';

import { AbstractCadastroComponent } from '../../../geral/crud/abstract-cadastro.component';

import { TipoPessoaService } from './../tipo-pessoa.service';
import { TipoPessoa } from './../tipo-pessoa.model';

@Component({
  selector: 'app-tipo-pessoa-cadastro',
  templateUrl: './tipo-pessoa-cadastro.component.html',
  styleUrls: ['./tipo-pessoa-cadastro.component.scss']
})
export class TipoPessoaCadastroComponent extends AbstractCadastroComponent<TipoPessoa, TipoPessoaService> {

  inscricoes: Subscription[] = [];

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("Selecione uma opção");
  itensSimNao : SelectGroupOption[] = EnumUtils.getOptionsSimNao("Selecione uma opção");

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tipoPessoa: TipoPessoaService,
    private msg: MensagemService) {
    super(route, router, msg);
  }

  getService(): TipoPessoaService {
    return this.tipoPessoa;
  }

  getVoNewInstance(): TipoPessoa {
    return TipoPessoa.getInstance();
  }

}

