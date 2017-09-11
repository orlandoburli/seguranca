import { TituloPaginaService } from './components/services/titulo-pagina.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private tituloPagina: string = "";
  private inscricao: Subscription;

  constructor(private tituloService: TituloPaginaService) { }

  ngOnInit() {
    // Inscreve no evento de mudança de título
    this.inscricao = this.tituloService.emitter.subscribe(titulo => {
      this.tituloPagina = titulo;
    });

  }

  ngOnDestroy() {
    // Remove o ponteiro de subscrição do evento de mudança de título.
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }
}
