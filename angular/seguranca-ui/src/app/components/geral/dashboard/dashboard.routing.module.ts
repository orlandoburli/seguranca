import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AutenticacaoGuard } from 'app/security/autenticacao.guard';

const rotas: Routes = [{
  path: 'dashboard', component: DashboardComponent, canActivate: [AutenticacaoGuard], children: [
    { path: 'home', component: HomeComponent, canActivate: [AutenticacaoGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
