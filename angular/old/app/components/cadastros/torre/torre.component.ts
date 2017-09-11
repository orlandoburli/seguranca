import { TituloPaginaService } from './../../services/titulo-pagina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torre',
  templateUrl: './torre.component.html',
  styleUrls: ['./torre.component.scss']
})
export class TorreComponent implements OnInit {

  constructor(private ts : TituloPaginaService) { }

  ngOnInit() {
    this.ts.setTitulo("Torres");
  }

}
