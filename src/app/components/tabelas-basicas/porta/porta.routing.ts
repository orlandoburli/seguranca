import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PortaCadastroComponent } from './porta-cadastro/porta-cadastro.component';
import { PortaConsultaComponent } from './porta-consulta/porta-consulta.component';
import { PortaComponent } from './porta.component';

const rotas: Routes = [{
  path: 'tabelas-basicas/porta', component: PortaComponent, children: [
    { path: '', component: PortaConsultaComponent },
    {
      path: ':acao', children: [
        { path: '', component: PortaCadastroComponent },
        { path: ':id', component: PortaCadastroComponent }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class PortaRoutingModule { }
