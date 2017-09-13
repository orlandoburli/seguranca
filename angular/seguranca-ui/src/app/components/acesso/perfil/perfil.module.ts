import { PerfilService } from './perfil.service';
import { PluginsModule } from './../../../plugins/plugins.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilCadastroComponent } from './perfil-cadastro/perfil-cadastro.component';
import { PerfilConsultaComponent } from './perfil-consulta/perfil-consulta.component';
import { PerfilComponent } from './perfil.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PluginsModule,
    PerfilRoutingModule
  ],
  declarations: [PerfilCadastroComponent, PerfilConsultaComponent, PerfilComponent],
  providers: [PerfilService]
})
export class PerfilModule { }
