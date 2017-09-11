import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlocoComponent } from './bloco.component';
import { BlocoCadastroComponent } from './bloco-cadastro/bloco-cadastro.component';
import { BlocoConsultaComponent } from './bloco-consulta/bloco-consulta.component';

import { PluginsModule } from './../../../plugins/plugins.module';
import { BlocoRoutingModule } from './bloco.routing';
import { BlocoService } from './bloco.service';

@NgModule({
  imports: [
    CommonModule,
    BlocoRoutingModule,
    FormsModule,
    PluginsModule
  ],
  declarations: [BlocoComponent, BlocoCadastroComponent, BlocoConsultaComponent],
  exports: [BlocoComponent, BlocoCadastroComponent, BlocoConsultaComponent],
  providers: [BlocoService]
})
export class BlocoModule { }
