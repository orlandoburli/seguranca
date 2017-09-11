import { CadastroResponse } from './../model/cadastro-response.model';
import { Injectable } from '@angular/core';
import { ConsultaResponse } from './../model/consulta-response.model';
import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';

import { ConsultaRequest } from './../model/consulta-request.model';

export abstract class AbstractCrudService<T> {

  headers: Headers;

  constructor(private _http: Http) {
    // cria uma instância de Headers
    this.headers = new Headers();
    // Adiciona o tipo de conteúdo application/json
    this.headers.append('Content-Type', 'application/json');
  }

  /**
   * Nome da entidade, para montar a URL do serviço
   */
  abstract getEntityName(): string;

  getUrl() {
    return "http://localhost:8080/seguranca-services/services/" + this.getEntityName();
  }

  /**
     * Retorna uma lista para o DataGrid
     */
  getList(consultaRequest: ConsultaRequest): Observable<ConsultaResponse<T>> {
    return this._http.post(this.getUrl() + "/pesquisar",
      JSON.stringify(consultaRequest),
      { headers: this.headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Retorna a entidade pelo ID.
   */
  buscar(id: any): Observable<T> {
    return this._http.get(this.getUrl() + "/" + id, { headers: this.headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Excluir a entidade
   */
  excluir(id: any): Observable<CadastroResponse<T>> {
    return this._http.delete(this.getUrl() + "/" + id, { headers: this.headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Atualizar a entidade
   */
  atualizar(vo: T, id: any): Observable<CadastroResponse<T>> {
    return this._http.put(this.getUrl(), JSON.stringify(vo), { headers: this.headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Inserir a entidade
   */
  inserir(vo: T): Observable<CadastroResponse<T>> {
    return this._http.post(this.getUrl(), JSON.stringify(vo), { headers: this.headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
