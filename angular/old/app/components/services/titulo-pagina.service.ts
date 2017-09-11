import { Injectable, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TituloPaginaService {

  private titulo: string = "";
  private tituloApp : string = "Innovare Security";

  // Emissor de evento indicando aos listener's que o texto mudou
  public emitter: EventEmitter<string> = new EventEmitter();

  constructor(private title : Title) { }

  /**
   * Serviço para setar o título da página
   */
  setTitulo(titulo: string) {
    this.titulo = titulo;

    // Seta o título da página
    this.title.setTitle(this.titulo + " - " + this.tituloApp);

    // Disparando este evento, irá alterar o título da página.
    this.emitter.emit(this.titulo);
  }

  getTitulo() {
    return this.titulo;
  }
}
