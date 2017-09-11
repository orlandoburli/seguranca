import { TorreService } from './../torre/torre.service';
import { BlocoService } from './../bloco/bloco.service';
import { FormsModule } from '@angular/forms';
import { UnidadeService } from './unidade.service';
import { PluginsModule } from './../../../plugins/plugins.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadeRoutingModule } from './unidade.routing';
import { UnidadeComponent } from './unidade.component';
import { UnidadeConsultaComponent } from './unidade-consulta/unidade-consulta.component';
import { UnidadeCadastroComponent } from './unidade-cadastro/unidade-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UnidadeRoutingModule,
    PluginsModule
  ],
  exports: [UnidadeComponent],
  providers: [UnidadeService, BlocoService, TorreService],
  declarations: [UnidadeComponent, UnidadeConsultaComponent, UnidadeCadastroComponent],
})
export class UnidadeModule { }
