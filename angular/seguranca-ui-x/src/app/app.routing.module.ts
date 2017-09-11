import { PaginaNaoEncontradaComponent } from './components/geral/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HomeComponent } from './components/geral/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

const rotasApp: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent }
    ]
  }
  // { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(rotasApp, { useHash: true })],
  exports: [RouterModule]
})
export class AppRountingModule { }
