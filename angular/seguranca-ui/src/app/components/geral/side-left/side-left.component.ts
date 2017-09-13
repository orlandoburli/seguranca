import { SessaoUsuario } from './../../../security/sessao.model';
import { LoginService } from './../../../security/login.service';
import { Menu } from './../../services/menu-sistema.service';
import { Usuario } from './../../acesso/usuario/usuario.model';
import { Component, OnInit } from '@angular/core';
import { MenuSistemaService } from 'app/components/services/menu-sistema.service';

@Component({
  selector: 'app-side-left',
  templateUrl: './side-left.component.html',
  styleUrls: ['./side-left.component.scss']
})
export class SideLeftComponent implements OnInit {

  sessaoUsuario: SessaoUsuario;
  menus: Menu[];

  constructor(
    private menuService: MenuSistemaService,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.sessaoUsuario = this.loginService.getUsuarioAutenticado();
    this.menus = this.menuService.getMenus();
  }
}
