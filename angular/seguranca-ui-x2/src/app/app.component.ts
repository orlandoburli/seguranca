import { LoginService } from './security/login.service';
import { AutenticacaoService } from './components/services/autenticacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private loginService: LoginService) {

  }

  isAutenticado(): boolean {
    return this.loginService.isAutenticado();
  }

}
