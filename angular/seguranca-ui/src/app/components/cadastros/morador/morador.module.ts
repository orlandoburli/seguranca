import { FormsModule } from '@angular/forms';
import { PluginsModule } from './../../../plugins/plugins.module';
import { MoradorService } from './morador.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoradorRoutingModule } from './morador-routing.module';
import { MoradorComponent } from './morador.component';
import { MoradorCadastroComponent } from './morador-cadastro/morador-cadastro.component';
import { MoradorConsultaComponent } from './morador-consulta/morador-consulta.component';

@NgModule({
  imports: [
    CommonModule,
    PluginsModule,
    FormsModule,
    MoradorRoutingModule
  ],
  declarations: [MoradorComponent, MoradorCadastroComponent, MoradorConsultaComponent],
  exports : [MoradorConsultaComponent],
  providers: [MoradorService]
})
export class MoradorModule { }
