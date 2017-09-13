import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { SessaoUsuario } from './sessao.model';
import { UsuarioService } from './../components/acesso/usuario/usuario.service';
import { Empresa } from './../components/acesso/empresa/empresa.model';
import { Observable } from 'rxjs/Observable';
import { CadastroResponse } from './../components/model/cadastro-response.model';
import { Usuario } from './../components/acesso/usuario/usuario.model';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class LoginService {

  // public usuarioAutenticado: UsuarioSessao;
  headers: Headers;

  private timerStarted = false;

  private inscricaoTimer: Subscription;

  constructor(private http: Http, private router: Router) {
    // cria uma instância de Headers
    this.headers = new Headers();
    // Adiciona o tipo de conteúdo application/json
    this.headers.append('Content-Type', 'application/json');

    this.timerStarted = false;
  }

  /**
   * Método de autenticacao
   * @param login Login a ser autenticado
   * @param senha Senha do usuario
   * @param empresa empresa que quer logar
   */
  entrar(login: string, senha: string, empresa: string): Observable<CadastroResponse<SessaoUsuario>> {
    const senhaMD5 = Md5.hashStr(senha);

    const dados = {
      'login': login,
      'senha': senha,
      'empresa': empresa
    };

    return this.http.post('/seguranca-resources/api/acesso',
      JSON.stringify(dados), { headers: this.headers })
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Seleciona a empresa e salva no localStorage.
   * @param empresa Empresa a ser salva.
   */
  selecionarEmpresa(empresa: Empresa) {
    const jsonEmpresa = JSON.stringify(empresa);

    localStorage.setItem('empresa', jsonEmpresa);
  }

  /**
   * Logoff da aplicacao.
   */
  logoff() {
    this.setUsuarioAutenticado(null);

    this.stopTimer();

    this.router.navigate(['/login']);
  }

  /**
   * Para o timer
   */
  stopTimer() {
    this.timerStarted = false;

    this.inscricaoTimer.unsubscribe();
  }

  /**
   * Inicia o timer para o keep alive
   */
  startTimer() {

    const timer = TimerObservable.create(2000, 60000);

    this.inscricaoTimer = timer.subscribe((t) => this.keepAliveRequest());

    this.timerStarted = true;
  }

  /**
   * Request do keep alive
   */
  keepAliveRequest() {

    // cria uma instância de Headers
    const headersKeepAlive = new Headers();
    // Adiciona o header da sessao
    headersKeepAlive.append('AUTHENTICATION_TOKEN', this.getUsuarioAutenticado().id);
    // Adiciona o tipo de conteúdo application/json
    headersKeepAlive.append('Content-Type', 'application/json');

    console.log('Keep alive... ' + this.getUsuarioAutenticado().id);

    const o: Observable<Response> =
      this.http.post('/seguranca-resources/api/ping', {}, { headers: headersKeepAlive });

    o.subscribe((dados) => {
      const retorno = dados.json();

      if (!retorno.success) {
        // Se nao deu certo, sai fora.
        this.logoff();
      }
    });

    // Loop
    // this.iniciarKeepAliveTimer();
  }

  /**
   * Indica se o usuário está autenticado
   * @returns True se o usuário existir
   */
  isAutenticado(): boolean {
    const u = this.getUsuarioAutenticado();

    try {
      if (u != null && u !== undefined) {
        if (!this.timerStarted) {
          this.startTimer();
        }
        return true;
      } else {
        if (this.timerStarted) {
          this.stopTimer();
        }
        return false;
      }
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  /**
   * Indica se ja foi selecionada uma empresa e salva no storage
   * @returns True se a empresa estiver selecionada
   */
  isEmpresaSelecionada(): boolean {
    const jsonEmpresa = localStorage.getItem('empresa');

    if (!jsonEmpresa) {
      return false;
    }

    const empresa: Empresa = JSON.parse(jsonEmpresa);

    if (empresa && empresa.id) {
      return true;
    }

    return false;
  }

  getEmpresa(): Empresa {
    const jsonEmpresa = localStorage.getItem('empresa');

    if (!jsonEmpresa) {
      return null;
    }

    const empresa: Empresa = JSON.parse(jsonEmpresa);

    if (empresa && empresa.id) {
      return empresa;
    }
  }

  getUsuarioAutenticado(): SessaoUsuario {
    const json = localStorage.getItem('usuario');

    const usuarioAutenticado: SessaoUsuario = JSON.parse(json);

    return usuarioAutenticado;
  }

  setUsuarioAutenticado(sessaoUsuario: SessaoUsuario) {
    if (sessaoUsuario != null) {
      localStorage.setItem('usuario', JSON.stringify(sessaoUsuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }

  chekcAutentication() {
    // TODO checar o cookie, se o usuário está autenticado, para recuperar a sessao do mesmo.
  }

  checkEmpresa() {
    // TODO checar o cookie da empresa
  }
}
