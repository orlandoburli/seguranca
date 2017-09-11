import { MoradorCadastroComponent } from './morador-cadastro/morador-cadastro.component';
import { MoradorConsultaComponent } from './morador-consulta/morador-consulta.component';
import { MoradorComponent } from './morador.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuard } from "app/security/autenticacao.guard";

const routes: Routes = [{
  path: 'cadastros/morador', component: MoradorComponent, canActivate: [AutenticacaoGuard], children: [
    { path: '', component: MoradorConsultaComponent },
    {
      path: ':acao', children: [
        { path: '', component: MoradorCadastroComponent },
        { path: ':id', component: MoradorCadastroComponent }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoradorRoutingModule { }
