import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { AreaComum } from './area-comum.model';
import { Injectable, Inject } from '@angular/core';
import { AbstractCrudService } from "app/components/services/abstract-crud.service";
import { ConsultaResponse } from "app/components/model/consulta-response.model";
import { LoginService } from "app/security/login.service";

@Injectable()
export class AreaComumService extends AbstractCrudService<AreaComum> {

  constructor( @Inject(Http) _http: Http, @Inject(LoginService) loginService: LoginService) {
    super(_http, loginService);
  }

  getEntityName(): string {
    return "areacomum";
  }

  getListAtivos(): Observable<ConsultaResponse<AreaComum>> {
    return this.getList({
      filtro: { "ativo": "Ativo" },
      order: { "nome": "asc" },
      pageSize: null,
      pageNumber: null
    });
  }

}
