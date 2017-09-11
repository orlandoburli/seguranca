import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AbstractCrudService } from '../../services/abstract-crud.service';
import { Bloco } from './bloco.model';
import { ConsultaResponse } from './../../model/consulta-response.model';

@Injectable()
export class BlocoService extends AbstractCrudService<Bloco> {

  constructor( @Inject(Http) _http: Http) {
    super(_http);
  }

  getEntityName(): string {
    return "bloco";
  }

  getListAtivos(): Observable<ConsultaResponse<Bloco>> {
    return this.getList({
      filtro: { "ativo": "Ativo" },
      order: { "nome": "asc" },
      pageSize: null,
      pageNumber: null
    });
  }

}
