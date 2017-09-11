import { Usuario } from './usuario.model';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AbstractCrudService } from '../../services/abstract-crud.service';
import { ConsultaResponse } from './../../model/consulta-response.model';
import { LoginService } from "app/security/login.service";

@Injectable()
export class UsuarioService extends AbstractCrudService<Usuario> {

  constructor( @Inject(Http) _http: Http, @Inject(LoginService) loginService: LoginService) {
    super(_http, loginService);
  }

  getEntityName(): string {
    return "usuario";
  }

  getListAtivos(): Observable<ConsultaResponse<Usuario>> {
    return this.getList({
      filtro: { "ativo": "Ativo" },
      order: { "nome": "asc" },
      pageSize: null,
      pageNumber: null
    });
  }

}
