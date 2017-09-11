import { Morador } from './morador.model';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AbstractCrudService } from '../../services/abstract-crud.service';
import { ConsultaResponse } from './../../model/consulta-response.model';
import { LoginService } from "app/security/login.service";

@Injectable()
export class MoradorService extends AbstractCrudService<Morador> {

  constructor( @Inject(Http) _http: Http, @Inject(LoginService) loginService: LoginService) {
    super(_http, loginService);
  }

  getEntityName(): string {
    return "morador";
  }

  getListAtivos(): Observable<ConsultaResponse<Morador>> {
    return this.getList({
      filtro: {},
      order: { "nome": "asc" },
      pageSize: null,
      pageNumber: null
    });
  }

}
