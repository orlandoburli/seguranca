import { ConsultaResponse } from './../../../model/consulta-response.model';
import { Perfil } from './../../perfil/perfil.model';
import { PerfilService } from './../../perfil/perfil.service';
import { SelectGroupComponent } from './../../../../plugins/forms/select-group/select-group.component';
import { UsuarioService } from './../usuario.service';
import { Usuario } from './../usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { Utils, EnumUtils } from './../../../../plugins/shared';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';

import { AbstractCadastroComponent } from '../../../geral/crud/abstract-cadastro.component';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent extends AbstractCadastroComponent<Usuario, UsuarioService> implements OnInit {

  inscricoes: Subscription[] = [];

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("Selecione uma opção");
  itensPerfil: SelectGroupOption[] = [];

  perfis: ConsultaResponse<Perfil>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private msg: MensagemService) {
    super(route, router, msg);
  }

  ngOnInit() {
    let s1 = this.perfilService.getListAtivos().subscribe(retorno => {
      this.itensPerfil = [{ label: "SELECIONE UM PERFIL" }];

      this.perfis = retorno;

      for (let perfil of this.perfis.lista) {
        this.itensPerfil.push({ label: perfil.nome, value: perfil.id.toString() });
      }

      super.ngOnInit();
    });
  }

  getService(): UsuarioService {
    return this.usuarioService;
  }

  getVoNewInstance(): Usuario {
    return { ativo: "Ativo", perfil: {} };
  }
}
