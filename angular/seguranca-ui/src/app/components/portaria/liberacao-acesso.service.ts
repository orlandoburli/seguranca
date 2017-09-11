import { LiberacaoAcesso } from './liberacao-acesso.model';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AbstractCrudService } from "app/components/services/abstract-crud.service";
import { ConsultaResponse } from "app/components/model/consulta-response.model";
import { LoginService } from "app/security/login.service";

@Injectable()
export class LiberacaoAcessoService extends AbstractCrudService<LiberacaoAcesso>{

  constructor( @Inject(Http) _http: Http, @Inject(LoginService) loginService: LoginService) {
    super(_http, loginService);
  }

  getEntityName(): string {
    return "liberacaoAcesso";
  }
}
