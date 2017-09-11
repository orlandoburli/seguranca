import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaConsultaComponent } from './pessoa-consulta/pessoa-consulta.component';
import { PessoaComponent } from './pessoa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuard } from "app/security/autenticacao.guard";

const routes: Routes = [{
  path: 'cadastros/pessoa', component: PessoaComponent, canActivate: [AutenticacaoGuard], children: [
    { path: '', component: PessoaConsultaComponent },
    {
      path: ':acao', children: [
        { path: '', component: PessoaCadastroComponent },
        { path: ':id', component: PessoaCadastroComponent }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
