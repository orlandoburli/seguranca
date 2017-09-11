import { PaginaNaoEncontradaComponent } from './components/geral/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HomeComponent } from './components/geral/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotasApp: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent }
  // { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(rotasApp)],
  exports: [RouterModule]
})
export class AppRountingModule { }
