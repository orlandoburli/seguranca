import { MenuSistemaService } from './../../services/menu-sistema.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private menus: any[] = [];

  constructor(private menuService: MenuSistemaService) { }

  ngOnInit() {
    this.menus = this.menuService.getMenus();
  }

}
