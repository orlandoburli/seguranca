import { Veiculo } from './veiculo.model';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AbstractCrudService } from '../../services/abstract-crud.service';
import { ConsultaResponse } from './../../model/consulta-response.model';
import { LoginService } from "app/security/login.service";

@Injectable()
export class VeiculoService extends AbstractCrudService<Veiculo> {

  constructor( @Inject(Http) _http: Http, @Inject(LoginService) loginService: LoginService) {
    super(_http, loginService);
  }

  getEntityName(): string {
    return "veiculo";
  }

  getListAtivos(): Observable<ConsultaResponse<Veiculo>> {
    return this.getList({
      filtro: {},
      order: { "morador.pessoa.nome": "asc", "placa": "asc" },
      pageSize: null,
      pageNumber: null
    });
  }
}
