import { AutenticacaoGuard } from './../../../security/autenticacao.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TorreComponent } from './torre.component';
import { TorreCadastroComponent } from './torre-cadastro/torre-cadastro.component';
import { TorreConsultaComponent } from './torre-consulta/torre-consulta.component';

const rotas: Routes = [{
  path: 'cadastros/torre', component: TorreComponent, canActivate: [AutenticacaoGuard], children: [
    { path: '', component: TorreConsultaComponent, canActivate: [AutenticacaoGuard] },
    {
      path: ':acao', canActivate: [AutenticacaoGuard], children: [
        { path: '', component: TorreCadastroComponent, canActivate: [AutenticacaoGuard] },
        { path: ':id', component: TorreCadastroComponent, canActivate: [AutenticacaoGuard] }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class TorreRoutingModule { }
