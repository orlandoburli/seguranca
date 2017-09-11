import { Forms } from './forms/forms.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Title } from '@angular/platform-browser';

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
    PaginaNaoEncontradaComponent,
    AuthLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Forms,
    PluginsModule,
    SidebarModule,
    FooterModule,
    NavbarModule,
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
