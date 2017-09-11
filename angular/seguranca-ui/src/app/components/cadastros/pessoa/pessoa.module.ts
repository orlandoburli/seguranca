import { CameraModule } from './../../../plugins/camera/camera.module';
import { EstadoModule } from './../estado/estado.module';
import { FormsModule } from '@angular/forms';
import { PluginsModule } from './../../../plugins/plugins.module';
import { PessoaService } from './pessoa.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaComponent } from './pessoa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaConsultaComponent } from './pessoa-consulta/pessoa-consulta.component';

@NgModule({
  imports: [
    CommonModule,
    PluginsModule,
    FormsModule,
    EstadoModule,
    PessoaRoutingModule,
    CameraModule
  ],
  declarations: [PessoaComponent, PessoaCadastroComponent, PessoaConsultaComponent],
  exports : [PessoaConsultaComponent, PessoaCadastroComponent],
  providers: [PessoaService]
})
export class PessoaModule { }
