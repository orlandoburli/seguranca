import { LiberacaoAcessoComponent } from './liberacao-acesso.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'portaria/liberacao-acesso', component: LiberacaoAcessoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiberacaoAcessoRoutingModule { }
