import { Unidade } from './unidade.model';
import { Component, OnInit } from '@angular/core';

import { TituloPaginaService } from './../../services/titulo-pagina.service';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss']
})
export class UnidadeComponent implements OnInit {

  constructor(private tituloService: TituloPaginaService) { }

  ngOnInit() {
    this.tituloService.setTitulo("Unidades");
  }
}
