import { SecurityModule } from './security/security.module';
import { BlocoModule } from './components/cadastros/bloco/bloco.module';
import { DashboardModule } from './components/geral/dashboard/dashboard.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";
import { GlobalErrorHandler } from "./_services/error-handler.service";

@NgModule({
    declarations: [
        ThemeComponent,
        AppComponent,
    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SecurityModule,
        // ThemeRoutingModule,
        AuthModule,
        DashboardModule,
        BlocoModule
    ],
    providers: [ScriptLoaderService, { provide: ErrorHandler, useClass: GlobalErrorHandler }],
    bootstrap: [AppComponent]
})
export class AppModule { }