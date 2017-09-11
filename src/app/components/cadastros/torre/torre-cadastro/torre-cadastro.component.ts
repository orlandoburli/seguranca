import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { AbstractCadastroComponent } from '../../../geral/crud/abstract-cadastro.component';

import { TorreService } from './../torre.service';
import { Torre } from './../torre.model';
import { Utils, EnumUtils } from './../../../../plugins/shared';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';

@Component({
  selector: 'app-torre-cadastro',
  templateUrl: './torre-cadastro.component.html',
  styleUrls: ['./torre-cadastro.component.scss']
})
export class TorreCadastroComponent extends AbstractCadastroComponent<Torre, TorreService> {

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("TODOS");
  itensSimNao: SelectGroupOption[] = EnumUtils.getOptionsSimNao("TODOS");

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private torreService: TorreService,
    private msg: MensagemService) {
    super(route, router, msg);
  }

  getService(): TorreService {
    return this.torreService;
  }

  getVoNewInstance(): Torre {
    return Torre.getInstance();
  }
}
