import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './../../../security/login.service';
import { MensagemService } from './../../../plugins/forms/mensagem.service';
import { Subscription } from 'rxjs/Rx';
import { EmpresaService } from './../../acesso/empresa/empresa.service';
import { Empresa } from './../../acesso/empresa/empresa.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-selecionar-empresa',
  templateUrl: './selecionar-empresa.component.html',
  styleUrls: ['./selecionar-empresa.component.css']
})
export class SelecionarEmpresaComponent implements OnInit, OnDestroy {

  private empresas: Empresa[] = [];
  private inscricoes: Subscription[] = [];

  private empresaSelecionada: string = "";

  constructor(
    private router: Router,
    private empresaService: EmpresaService,
    private msg: MensagemService,
    private login: LoginService) { }

  ngOnInit() {
    let s1 = this.empresaService.getEmpresas()
      .subscribe((retorno) => this.empresas = retorno);

    this.inscricoes.push(s1);
  }

  selecionar() {
    if (!this.empresaSelecionada) {
      this.msg.warn("Selecione um condomínio!");
    }

    for (let e of this.empresas) {
      if (e.id == this.empresaSelecionada) {
        this.login.selecionarEmpresa(e);

        this.router.navigate(['/login']);
      }
    }
  }

  ngOnDestroy() {
    for (let s of this.inscricoes) {
      s.unsubscribe();
    }
  }
}
