import { VeiculoService } from './veiculo.service';
import { FormsModule } from '@angular/forms';
import { PluginsModule } from './../../../plugins/plugins.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeiculoRoutingModule } from './veiculo-routing.module';
import { VeiculoComponent } from './veiculo.component';
import { VeiculoCadastroComponent } from './veiculo-cadastro/veiculo-cadastro.component';
import { VeiculoConsultaComponent } from './veiculo-consulta/veiculo-consulta.component';

@NgModule({
  imports: [
    CommonModule,
    PluginsModule,
    FormsModule,
    VeiculoRoutingModule
  ],
  declarations: [VeiculoComponent, VeiculoCadastroComponent, VeiculoConsultaComponent],
  providers: [VeiculoService]
})
export class VeiculoModule { }
