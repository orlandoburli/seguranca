import { UnidadeComponent } from './unidade.component';
import { UnidadeCadastroComponent } from './unidade-cadastro/unidade-cadastro.component';
import { UnidadeConsultaComponent } from './unidade-consulta/unidade-consulta.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AutenticacaoGuard } from "app/security/autenticacao.guard";

const rotas: Routes = [{
  path: 'cadastros/unidade', component: UnidadeComponent, canActivate: [AutenticacaoGuard], children: [
    { path: '', component: UnidadeConsultaComponent },
    {
      path: ':acao', children: [
        { path: '', component: UnidadeCadastroComponent },
        { path: ':id', component: UnidadeCadastroComponent }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class UnidadeRoutingModule { }
