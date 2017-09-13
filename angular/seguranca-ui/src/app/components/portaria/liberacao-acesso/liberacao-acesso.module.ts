import { MoradorModule } from './../../cadastros/morador/morador.module';
import { PessoaModule } from './../../cadastros/pessoa/pessoa.module';
import { FormsModule } from '@angular/forms';
import { PluginsModule } from './../../../plugins/plugins.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiberacaoAcessoRoutingModule } from './liberacao-acesso-routing.module';
import { LiberacaoAcessoComponent } from "app/components/portaria/liberacao-acesso/liberacao-acesso.component";

@NgModule({
  imports: [
    CommonModule,
    PluginsModule,
    FormsModule,
    LiberacaoAcessoRoutingModule,
    PessoaModule,
    MoradorModule
  ],
  declarations: [LiberacaoAcessoComponent]
})
export class LiberacaoAcessoModule { }
