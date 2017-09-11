import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AbstractCrudService } from '../../services/abstract-crud.service';
import { ConsultaResponse } from './../../model/consulta-response.model';
import { Unidade } from './unidade.model';
import { LoginService } from "app/security/login.service";

@Injectable()
export class UnidadeService extends AbstractCrudService<Unidade> {

  constructor( @Inject(Http) _http: Http, @Inject(LoginService) loginService: LoginService) {
    super(_http, loginService);
  }

  getEntityName(): string {
    return "unidade";
  }

  getListAtivos(): Observable<ConsultaResponse<Unidade>> {
    return this.getList({
      filtro: { "ativo": "Ativo" },
      order: { "numero": "asc" },
      pageSize: null,
      pageNumber: null
    });
  }
}
