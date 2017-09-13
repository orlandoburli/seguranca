import { TituloPaginaService } from './../../services/titulo-pagina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

  constructor(private ts : TituloPaginaService) { }

  ngOnInit() {
    this.ts.setTitulo("Veículos");
  }
}
