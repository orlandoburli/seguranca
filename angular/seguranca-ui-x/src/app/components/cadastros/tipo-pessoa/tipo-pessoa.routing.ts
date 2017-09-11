import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TipoPessoaComponent } from './tipo-pessoa.component';
import { TipoPessoaCadastroComponent } from './tipo-pessoa-cadastro/tipo-pessoa-cadastro.component';
import { TipoPessoaConsultaComponent } from './tipo-pessoa-consulta/tipo-pessoa-consulta.component';

const rotas: Routes = [{
  path: 'cadastros/tipo-pessoa', component: TipoPessoaComponent, children: [
    { path: '', component: TipoPessoaConsultaComponent },
    {
      path: ':acao', children: [
        { path: '', component: TipoPessoaCadastroComponent },
        { path: ':id', component: TipoPessoaCadastroComponent }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class TorreRoutingModule { }
