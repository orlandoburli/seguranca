import { TituloPaginaService } from './../../services/titulo-pagina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.scss']
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(private tituloService :  TituloPaginaService) { }

  ngOnInit() {
    this.tituloService.setTitulo("Página não encontrada!");
  }

}
