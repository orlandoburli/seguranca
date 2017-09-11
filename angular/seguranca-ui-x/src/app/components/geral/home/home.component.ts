import { TituloPaginaService } from './../../services/titulo-pagina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private tituloService : TituloPaginaService) { }

  ngOnInit() {
    this.tituloService.setTitulo("Home");
  }
}
