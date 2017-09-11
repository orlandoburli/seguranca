import { PluginsModule } from './../../../plugins/plugins.module';
import { FormsModule } from '@angular/forms';
import { TorreRoutingModule } from './torre.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TorreComponent } from './torre.component';
import { TorreService } from './torre.service';
import { TorreConsultaComponent } from './torre-consulta/torre-consulta.component';
import { TorreCadastroComponent } from './torre-cadastro/torre-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    TorreRoutingModule,
    FormsModule,
    PluginsModule
  ],
  declarations: [TorreComponent, TorreConsultaComponent, TorreCadastroComponent],
  exports : [TorreComponent, TorreCadastroComponent, TorreConsultaComponent],
  providers: [TorreService]
})
export class TorreModule { }
