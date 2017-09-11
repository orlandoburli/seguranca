import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AbstractCrudService } from '../../services/abstract-crud.service';
import { Torre } from './torre.model';
import { ConsultaResponse } from './../../model/consulta-response.model';

@Injectable()
export class TorreService extends AbstractCrudService<Torre> {

  constructor( @Inject(Http) _http: Http) {
    super(_http);
  }

  getEntityName(): string {
    return "torre";
  }

  getListAtivos(): Observable<ConsultaResponse<Torre>> {
    return this.getList({
      filtro: { "ativo": "Ativo" },
      order: { "nome": "asc" },
      pageSize: null,
      pageNumber: null
    });
  }

}
