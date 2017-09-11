import { AutenticacaoGuard } from './../../../security/autenticacao.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaComumCadastroComponent } from './area-comum-cadastro/area-comum-cadastro.component';
import { AreaComumConsultaComponent } from './area-comum-consulta/area-comum-consulta.component';
import { AreaComumComponent } from './area-comum.component';

const rotas: Routes = [{
  path: 'tabelas-basicas/areacomum', component: AreaComumComponent, canActivate: [AutenticacaoGuard], children: [
    { path: '', component: AreaComumConsultaComponent },
    {
      path: ':acao', children: [
        { path: '', component: AreaComumCadastroComponent },
        { path: ':id', component: AreaComumCadastroComponent }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class AreaComumRoutingModule { }
