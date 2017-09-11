import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AbstractCrudService } from '../../services/abstract-crud.service';
import { ConsultaResponse } from './../../model/consulta-response.model';
import { Porta } from './porta.model';

@Injectable()
export class PortaService extends AbstractCrudService<Porta> {

  constructor( @Inject(Http) _http: Http) {
    super(_http);
  }

  getEntityName(): string {
    return "porta";
  }

  getListAtivos(): Observable<ConsultaResponse<Porta>> {
    return this.getList({
      filtro: { "ativo": "Ativo" },
      order: { "nome": "asc" },
      pageSize: null,
      pageNumber: null
    });
  }

}
