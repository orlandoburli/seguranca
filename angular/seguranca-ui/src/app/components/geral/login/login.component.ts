import { Router } from '@angular/router';
import { MensagemService } from './../../../plugins/forms/mensagem.service';
import { Empresa } from './../../acesso/empresa/empresa.model';
import { LoginService } from './../../../security/login.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private empresa: Empresa;
  private login: string;
  private senha: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private msg: MensagemService) { }

  ngOnInit() {
    this.empresa = this.loginService.getEmpresa();

    $('#login').on('keydown', function (e) {
      if (e.keyCode === 13) {
        $('#senha').focus();
      }
    });

    $('#senha').on('keydown', function (e) {
      if (e.keyCode === 13) {
        $('#botaoEntrar').click();
      }
    });
  }

  entrar() {
    if (!this.login || !this.login.trim()) {

      this.msg.warn('Informe o seu usuário')
        .then(() => $('#login').focus());

    } else if (!this.senha || !this.senha.trim()) {

      this.msg.warn('Informe a sua senha')
        .then(() => $('#senha').focus());

    } else {
      this.loginService
        .entrar(this.login, this.senha, this.empresa.id)
        .subscribe((retorno) => {
          if (retorno.success) {

            this.loginService.setUsuarioAutenticado(retorno.vo);

            this.loginService.startTimer();

            this.router.navigate(['/dashboard/home']);
          } else {
            this.msg.error(retorno.message)
              .then(() => $('#login').focus());
          }
        });
    }
  }
}
