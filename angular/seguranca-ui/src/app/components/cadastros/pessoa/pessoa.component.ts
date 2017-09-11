import { Component, OnInit } from '@angular/core';
import { TituloPaginaService } from "app/components/services/titulo-pagina.service";

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  constructor(private ts : TituloPaginaService) { }

  ngOnInit() {
    this.ts.setTitulo("Visitantes / Prestadores de Serviço");
  }

}
