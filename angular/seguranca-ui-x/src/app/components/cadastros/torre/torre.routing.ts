import { AdminLayoutComponent } from './../../../layouts/admin/admin-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TorreComponent } from './torre.component';
import { TorreCadastroComponent } from './torre-cadastro/torre-cadastro.component';
import { TorreConsultaComponent } from './torre-consulta/torre-consulta.component';

const rotas: Routes = [{
  path: '', component: AdminLayoutComponent, children: [
    {
      path: 'cadastros/torre', component: TorreComponent, children: [
        { path: '', component: TorreConsultaComponent },
        {
          path: ':acao', children: [
            { path: '', component: TorreCadastroComponent },
            { path: ':id', component: TorreCadastroComponent }
          ]
        }
      ]
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class TorreRoutingModule { }
