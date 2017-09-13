import { TituloPaginaService } from './../components/services/titulo-pagina.service';
import { LoginService } from './login.service';
import { AutenticacaoService } from './../components/services/autenticacao.service';
import { EmpresaGuard } from './empresa.guard';
import { AutenticacaoGuard } from './autenticacao.guard';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [AutenticacaoGuard, EmpresaGuard, AutenticacaoService, LoginService, TituloPaginaService],
})
export class SecurityModule { }
