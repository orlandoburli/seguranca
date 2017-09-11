import { VeiculoCadastroComponent } from './veiculo-cadastro/veiculo-cadastro.component';
import { VeiculoConsultaComponent } from './veiculo-consulta/veiculo-consulta.component';
import { VeiculoComponent } from './veiculo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuard } from "app/security/autenticacao.guard";

const routes: Routes = [{
  path: 'cadastros/veiculo', component: VeiculoComponent, canActivate: [AutenticacaoGuard], children: [
    { path: '', component: VeiculoConsultaComponent },
    {
      path: ':acao', children: [
        { path: '', component: VeiculoCadastroComponent },
        { path: ':id', component: VeiculoCadastroComponent }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeiculoRoutingModule { }
