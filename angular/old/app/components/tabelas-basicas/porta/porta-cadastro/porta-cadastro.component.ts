import { PortaService } from './../porta.service';
import { Porta } from './../porta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { Utils, EnumUtils } from './../../../../plugins/shared';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';

import { AbstractCadastroComponent } from '../../../geral/crud/abstract-cadastro.component';

@Component({
  selector: 'app-porta-cadastro',
  templateUrl: './porta-cadastro.component.html',
  styleUrls: ['./porta-cadastro.component.scss']
})
export class PortaCadastroComponent extends AbstractCadastroComponent<Porta, PortaService> {

  inscricoes: Subscription[] = [];

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo();
  itensTipoPorta: SelectGroupOption[] = EnumUtils.getOptionsTipoPorta();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private portaService: PortaService,
    private msg: MensagemService) {
    super(route, router, msg);
  }

  getService(): PortaService {
    return this.portaService;
  }

  getVoNewInstance(): Porta {
    return { ativo: "Ativo", tipo: "Entrada" }
  }
}
