import { LoginService } from './../../security/login.service';
import { CadastroResponse } from './../model/cadastro-response.model';
import { Injectable } from '@angular/core';
import { ConsultaResponse } from './../model/consulta-response.model';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';

import { ConsultaRequest } from './../model/consulta-request.model';

export abstract class AbstractCrudService<T> {

  constructor(private _http: Http, private loginService: LoginService) {

  }

  getHeaders(): Headers {
    // cria uma instância de Headers
    const headers = new Headers();
    // Adiciona o tipo de conteúdo application/json
    headers.append('Content-Type', 'application/json');
    // Adiciona o token de autenticacao
    if (this.loginService.getUsuarioAutenticado() != null) {
      headers.append('AUTHENTICATION_TOKEN', this.loginService.getUsuarioAutenticado().id);
    }

    return headers;
  }

  /**
   * Nome da entidade, para montar a URL do serviço
   */
  abstract getEntityName(): string;

  getUrl() {
    return '/seguranca-resources/api/' + this.getEntityName();
  }

  private extractData(res: Response) {
    const body = res.json();

    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      errMsg = body;// `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    // console.error(errMsg);

    return Observable.throw(errMsg);
  }

  /**
     * Retorna uma lista para o DataGrid
     */
  getList(consultaRequest: ConsultaRequest): Observable<ConsultaResponse<T>> {
    return this._http.post(this.getUrl() + '/pesquisar',
      JSON.stringify(consultaRequest),
      { headers: this.getHeaders() })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Retorna a entidade pelo ID.
   */
  buscar(id: any): Observable<T> {
    return this._http.get(this.getUrl() + '/' + id, { headers: this.getHeaders() })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Excluir a entidade
   */
  excluir(id: any): Observable<CadastroResponse<T>> {
    return this._http.delete(this.getUrl() + '/' + id, { headers: this.getHeaders() })
      // .map(res => res.json())
      // .catch((error: any) => Observable.throw(error || 'Server error'));
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Atualizar a entidade
   */
  atualizar(vo: T, id: any): Observable<CadastroResponse<T>> {
    return this._http.put(this.getUrl(), JSON.stringify(vo), { headers: this.getHeaders() })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Inserir a entidade
   */
  inserir(vo: T): Observable<CadastroResponse<T>> {
    const vo2: any = vo;
    vo2.empresa = this.loginService.getEmpresa();

    return this._http.post(this.getUrl(), JSON.stringify(vo2), { headers: this.getHeaders() })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
