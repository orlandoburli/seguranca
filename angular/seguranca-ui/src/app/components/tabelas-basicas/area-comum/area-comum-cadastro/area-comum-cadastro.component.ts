import { AreaComumService } from './../area-comum.service';
import { AreaComum } from './../area-comum.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { Utils, EnumUtils } from './../../../../plugins/shared';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';

import { AbstractCadastroComponent } from '../../../geral/crud/abstract-cadastro.component';

@Component({
  selector: 'app-area-comum-cadastro',
  templateUrl: './area-comum-cadastro.component.html',
  styleUrls: ['./area-comum-cadastro.component.css']
})
export class AreaComumCadastroComponent extends AbstractCadastroComponent<AreaComum, AreaComumService> {

  inscricoes: Subscription[] = [];

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo();
  itensTipoPorta: SelectGroupOption[] = EnumUtils.getOptionsTipoPorta();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private areaComumService: AreaComumService,
    private msg: MensagemService) {
    super(route, router, msg);
  }

  getService(): AreaComumService {
    return this.areaComumService;
  }

  getVoNewInstance(): AreaComum {
    return { ativo: "Ativo", maximoConvidados : 0 }
  }


}
