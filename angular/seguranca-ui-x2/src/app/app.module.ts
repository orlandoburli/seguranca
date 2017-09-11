import { DashboardModule } from './components/geral/dashboard/dashboard.module';
import { EmpresaService } from './components/acesso/empresa/empresa.service';
import { EmpresaGuard } from './security/empresa.guard';
import { LoginService } from './security/login.service';
import { AutenticacaoGuard } from './security/autenticacao.guard';
import { LiberacaoAcessoModule } from './components/portaria/liberacao-acesso/liberacao-acesso.module';
import { VeiculoModule } from './components/cadastros/veiculo/veiculo.module';
import { MoradorModule } from './components/cadastros/morador/morador.module';
import { PessoaModule } from './components/cadastros/pessoa/pessoa.module';
import { UsuarioModule } from './components/acesso/usuario/usuario.module';
import { PerfilModule } from './components/acesso/perfil/perfil.module';
import { UnidadeModule } from './components/cadastros/unidade/unidade.module';
import { AreaComumModule } from './components/tabelas-basicas/area-comum/area-comum.module';
import { PortaModule } from './components/tabelas-basicas/porta/porta.module';
import { TipoPessoaModule } from './components/cadastros/tipo-pessoa/tipo-pessoa.module';
import { BlocoModule } from './components/cadastros/bloco/bloco.module';
import { MenuSistemaService } from './components/services/menu-sistema.service';
import { HeaderComponent } from './components/geral/header/header.component';
import { FooterComponent } from './components/geral/footer/footer.component';
import { SideLeftComponent } from './components/geral/side-left/side-left.component';
import { TituloPaginaService } from './components/services/titulo-pagina.service';
import { TorreModule } from './components/cadastros/torre/torre.module';
import { PluginsModule } from './plugins/plugins.module';
import { AppRountingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/geral/login/login.component';
import { SelecionarEmpresaComponent } from './components/geral/selecionar-empresa/selecionar-empresa.component';
import { LogoffComponent } from './components/geral/logoff/logoff.component';

@NgModule({
  declarations: [
    AppComponent,
    SideLeftComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SelecionarEmpresaComponent,
    LogoffComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRountingModule,
    PluginsModule,
    TorreModule,
    BlocoModule,
    PortaModule,
    TipoPessoaModule,
    AreaComumModule,
    UnidadeModule,
    PerfilModule,
    UsuarioModule,
    PessoaModule,
    MoradorModule,
    VeiculoModule,
    LiberacaoAcessoModule,
    DashboardModule
  ],
  providers: [TituloPaginaService, MenuSistemaService, AutenticacaoGuard, EmpresaGuard, LoginService, EmpresaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
