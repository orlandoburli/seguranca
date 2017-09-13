import { Estado } from './estado.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ConsultaResponse } from "app/components/model/consulta-response.model";

@Injectable()
export class EstadoService {

  headers: Headers;

  constructor(private _http: Http) {
    // cria uma instância de Headers
    this.headers = new Headers();
    // Adiciona o tipo de conteúdo application/json
    this.headers.append('Content-Type', 'application/json');
  }

  getUrl() {
    return "/seguranca-resources/api/";
  }

  getList(): Observable<ConsultaResponse<Estado>> {
    return this._http.get(this.getUrl() + "pessoa/estados",
      { headers: this.headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
