import { Component, OnInit } from '@angular/core';
import { TituloPaginaService } from "app/components/services/titulo-pagina.service";

@Component({
  selector: 'app-morador',
  templateUrl: './morador.component.html',
  styleUrls: ['./morador.component.css']
})
export class MoradorComponent implements OnInit {

  constructor(private ts : TituloPaginaService) { }

  ngOnInit() {
    this.ts.setTitulo("Moradores")
  }

}
