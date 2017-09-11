import { Http } from '@angular/http';
import { Inject, Injectable } from '@angular/core';

import { AbstractCrudService } from '../../services/abstract-crud.service';
import { TipoPessoa } from './tipo-pessoa.model';

@Injectable()
export class TipoPessoaService extends AbstractCrudService<TipoPessoa> {

  constructor( @Inject(Http) _http: Http) {
    super(_http);
  }

  getEntityName(): string {
    return "tipo-pessoa";
  }
}
