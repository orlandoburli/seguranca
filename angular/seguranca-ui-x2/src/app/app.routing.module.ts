import { HomeComponent } from './components/geral/dashboard/home/home.component';
import { LogoffComponent } from './components/geral/logoff/logoff.component';
import { DashboardComponent } from './components/geral/dashboard/dashboard.component';
import { SelecionarEmpresaComponent } from './components/geral/selecionar-empresa/selecionar-empresa.component';
import { EmpresaGuard } from './security/empresa.guard';
import { LoginComponent } from './components/geral/login/login.component';
import { AutenticacaoGuard } from './security/autenticacao.guard';
import { PaginaNaoEncontradaComponent } from './components/geral/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotasApp: Routes = [
  { path: 'selecionar-empresa', component: SelecionarEmpresaComponent },
  { path: 'login', component: LoginComponent, canActivate: [EmpresaGuard] },
  { path: 'logoff', component: LogoffComponent },
  { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' }
  // { path: 'home', component: HomeComponent, canActivate: [AutenticacaoGuard] },
  // { path: 'dashboard/home', component: HomeComponent, canActivate: [AutenticacaoGuard] },
  // { path: '', component: HomeComponent, canActivate: [AutenticacaoGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(rotasApp, { useHash: true })],
  exports: [RouterModule]
})
export class AppRountingModule { }
