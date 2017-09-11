import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluginsModule } from './../../../plugins/plugins.module';
import { TipoPessoaComponent } from './tipo-pessoa.component';
import { TipoPessoaCadastroComponent } from './tipo-pessoa-cadastro/tipo-pessoa-cadastro.component';
import { TipoPessoaConsultaComponent } from './tipo-pessoa-consulta/tipo-pessoa-consulta.component';
import { TipoPessoaService } from './tipo-pessoa.service';
import { TorreRoutingModule } from './tipo-pessoa.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PluginsModule,
    TorreRoutingModule
  ],
  providers : [TipoPessoaService],
  declarations: [TipoPessoaComponent, TipoPessoaCadastroComponent, TipoPessoaConsultaComponent]
})
export class TipoPessoaModule { }
