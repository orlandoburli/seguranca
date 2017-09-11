import { Http } from '@angular/http';
import { Empresa } from './empresa.model';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class EmpresaService {

  constructor(private http: Http) { }

  getEmpresas(): Observable<Empresa[]> {
    return this.http.post("/seguranca-resources/api/empresa/selecionar", {})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
