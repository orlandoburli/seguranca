import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { Utils, EnumUtils } from './../../../../plugins/shared';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';

import { AbstractCadastroComponent } from '../../../geral/crud/abstract-cadastro.component';

import { BlocoService } from './../bloco.service';
import { Bloco } from './../bloco.model';

@Component({
  selector: 'app-bloco-cadastro',
  templateUrl: './bloco-cadastro.component.html',
  styleUrls: ['./bloco-cadastro.component.scss']
})
export class BlocoCadastroComponent extends AbstractCadastroComponent<Bloco, BlocoService> {

  inscricoes: Subscription[] = [];

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo('Selecione uma opção');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blocoService: BlocoService,
    private msg: MensagemService) {
    super(route, router, msg);
  }

  getService(): BlocoService {
    return this.blocoService;
  }

  getVoNewInstance(): Bloco {
    return Bloco.getInstance();
  }
}
