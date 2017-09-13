import { TituloPaginaService } from './../../services/titulo-pagina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-pessoa',
  templateUrl: './tipo-pessoa.component.html',
  styleUrls: ['./tipo-pessoa.component.scss']
})
export class TipoPessoaComponent implements OnInit {

  constructor(private tituloService : TituloPaginaService) { }

  ngOnInit() {
    this.tituloService.setTitulo("Tipos de Pessoa");
  }

}
