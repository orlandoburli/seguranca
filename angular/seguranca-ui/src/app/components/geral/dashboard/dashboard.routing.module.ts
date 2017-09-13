import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AutenticacaoGuard } from '../../../security/autenticacao.guard';

// import { AutenticacaoGuard } from 'app/security/autenticacao.guard';

const rotas: Routes = [{
  path: 'dashboard', component: DashboardComponent, children: [
    { path: 'home', component: HomeComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

console.log(rotas);