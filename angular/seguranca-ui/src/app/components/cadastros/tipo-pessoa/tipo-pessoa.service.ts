import { ConsultaResponse } from './../../model/consulta-response.model';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Inject, Injectable } from '@angular/core';

import { AbstractCrudService } from '../../services/abstract-crud.service';
import { TipoPessoa } from './tipo-pessoa.model';
import { LoginService } from 'app/security/login.service';

@Injectable()
export class TipoPessoaService extends AbstractCrudService<TipoPessoa> {

  constructor( @Inject(Http) _http: Http, @Inject(LoginService) loginService: LoginService) {
    super(_http, loginService);
  }

  getEntityName(): string {
    return 'tipo-pessoa';
  }

  getListAtivosNaoMorador(): Observable<ConsultaResponse<TipoPessoa>> {
    return this.getList({
      filtro: { 'ativo': 'Ativo', 'morador' : 'Não' },
      order: { 'nome': 'asc' },
      pageSize: null,
      pageNumber: null
    });
  }

  getListAtivosMorador(): Observable<ConsultaResponse<TipoPessoa>> {
    return this.getList({
      filtro: { 'ativo': 'Ativo', 'morador' : 'Sim' },
      order: { 'nome': 'asc' },
      pageSize: null,
      pageNumber: null
    });
  }
}
