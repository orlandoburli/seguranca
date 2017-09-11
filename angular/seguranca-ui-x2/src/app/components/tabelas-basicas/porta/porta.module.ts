import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluginsModule } from './../../../plugins/plugins.module';
import { PortaConsultaComponent } from './porta-consulta/porta-consulta.component';
import { PortaCadastroComponent } from './porta-cadastro/porta-cadastro.component';
import { PortaComponent } from './porta.component';
import { PortaService } from './porta.service';
import { PortaRoutingModule } from './porta.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PluginsModule,
    PortaRoutingModule
  ],
  providers: [PortaService],
  declarations: [PortaComponent, PortaCadastroComponent, PortaConsultaComponent],
  exports: [PortaComponent]
})
export class PortaModule { }
