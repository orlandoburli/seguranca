import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AuthLayoutComponent } from './../../seguranca-ui/src/app/layouts/auth/auth-layout.component';
import { AdminLayoutComponent } from './../../seguranca-ui/src/app/layouts/admin/admin-layout.component';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/geral/header/header.component';
import { FooterComponent } from './components/geral/footer/footer.component';
import { SideLeftComponent } from './components/geral/side-left/side-left.component';
import { HomeComponent } from './components/geral/home/home.component';
import { PaginaNaoEncontradaComponent } from './components/geral/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { TituloPaginaService } from './components/services/titulo-pagina.service';
import { MenuSistemaService } from './components/services/menu-sistema.service';
import { AppRountingModule } from './app.routing.module';
import { UnidadeModule } from './components/cadastros/unidade/unidade.module';
import { PluginsModule } from './plugins/plugins.module';
import { BlocoModule } from './components/cadastros/bloco/bloco.module';
import { TorreModule } from './components/cadastros/torre/torre.module';
import { TipoPessoaModule } from './components/cadastros/tipo-pessoa/tipo-pessoa.module';
import { PortaModule } from './components/tabelas-basicas/porta/porta.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideLeftComponent,
    HomeComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PluginsModule,
    AppRountingModule,
    UnidadeModule,
    TorreModule,
    BlocoModule,
    TipoPessoaModule,
    PortaModule
  ],
  providers: [TituloPaginaService, MenuSistemaService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
