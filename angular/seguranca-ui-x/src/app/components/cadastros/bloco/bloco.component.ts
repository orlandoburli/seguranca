import { TituloPaginaService } from './../../services/titulo-pagina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloco',
  templateUrl: './bloco.component.html',
  styleUrls: ['./bloco.component.scss']
})
export class BlocoComponent implements OnInit {

  constructor(private tituloService: TituloPaginaService) { }

  ngOnInit() {
    this.tituloService.setTitulo("Blocos");
  }

}
