import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BlocoComponent } from './bloco.component';
import { BlocoCadastroComponent } from './bloco-cadastro/bloco-cadastro.component';
import { BlocoConsultaComponent } from './bloco-consulta/bloco-consulta.component';
import { AutenticacaoGuard } from "../../../security/autenticacao.guard";

const rotas: Routes = [{
  path: 'bloco', component: BlocoComponent, canActivate: [AutenticacaoGuard], children: [
    { path: '', component: BlocoConsultaComponent },
    {
      path: ':acao', children: [
        { path: '', component: BlocoCadastroComponent },
        { path: ':id', component: BlocoCadastroComponent }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class BlocoRoutingModule { }
