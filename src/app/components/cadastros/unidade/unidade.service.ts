import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AbstractCrudService } from '../../services/abstract-crud.service';
import { Unidade } from './unidade.model';

@Injectable()
export class UnidadeService extends AbstractCrudService<Unidade> {

  constructor( @Inject(Http) _http: Http) {
    super(_http);
  }

  getEntityName(): string {
    return "unidade";
  }
}
