import { PerfilService } from './../perfil.service';
import { Perfil } from './../perfil.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { Utils, EnumUtils } from './../../../../plugins/shared';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';

import { AbstractCadastroComponent } from '../../../geral/crud/abstract-cadastro.component';


@Component({
  selector: 'app-perfil-cadastro',
  templateUrl: './perfil-cadastro.component.html',
  styleUrls: ['./perfil-cadastro.component.css']
})
export class PerfilCadastroComponent extends AbstractCadastroComponent<Perfil, PerfilService> {

  inscricoes: Subscription[] = [];

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("Selecione uma opção");

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blocoService: PerfilService,
    private msg: MensagemService) {
    super(route, router, msg);
  }

  getService(): PerfilService {
    return this.blocoService;
  }

  getVoNewInstance(): Perfil {
    return Perfil.getInstance();
  }
}
