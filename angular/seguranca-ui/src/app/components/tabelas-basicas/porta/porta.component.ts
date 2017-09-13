import { Component, OnInit } from '@angular/core';

import { TituloPaginaService } from './../../services/titulo-pagina.service';

@Component({
  selector: 'app-porta',
  templateUrl: './porta.component.html',
  styleUrls: ['./porta.component.scss']
})
export class PortaComponent implements OnInit {

  constructor(private tituloService: TituloPaginaService) { }

  ngOnInit() {
    this.tituloService.setTitulo("Portas do condomínio");
  }

}
