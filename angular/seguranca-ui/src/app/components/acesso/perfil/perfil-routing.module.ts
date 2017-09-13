import { PerfilCadastroComponent } from './perfil-cadastro/perfil-cadastro.component';
import { PerfilConsultaComponent } from './perfil-consulta/perfil-consulta.component';
import { PerfilComponent } from './perfil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuard } from "app/security/autenticacao.guard";

const routes: Routes = [{
  path: 'acesso/perfil', component: PerfilComponent, canActivate: [AutenticacaoGuard], children: [
    { path: '', component: PerfilConsultaComponent },
    {
      path: ':acao', children: [
        { path: '', component: PerfilCadastroComponent },
        { path: ':id', component: PerfilCadastroComponent }
      ]
    }
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
