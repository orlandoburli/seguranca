import { AreaComumService } from './area-comum.service';
import { PluginsModule } from './../../../plugins/plugins.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaComumRoutingModule } from './area-comum-routing.module';
import { AreaComumCadastroComponent } from './area-comum-cadastro/area-comum-cadastro.component';
import { AreaComumConsultaComponent } from './area-comum-consulta/area-comum-consulta.component';
import { AreaComumComponent } from './area-comum.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PluginsModule,
    AreaComumRoutingModule
  ],
  declarations: [AreaComumCadastroComponent, AreaComumConsultaComponent, AreaComumComponent],
  providers: [AreaComumService]
})
export class AreaComumModule { }
