import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioConsultaComponent } from './usuario-consulta/usuario-consulta.component';
import { UsuarioComponent } from './usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuard } from "app/security/autenticacao.guard";

const routes: Routes = [{
  path: 'acesso/usuario', component: UsuarioComponent, canActivate: [AutenticacaoGuard], children: [
    { path: '', component: UsuarioConsultaComponent },
    {
      path: ':acao', children: [
        { path: '', component: UsuarioCadastroComponent },
        { path: ':id', component: UsuarioCadastroComponent }
      ]
    }
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
