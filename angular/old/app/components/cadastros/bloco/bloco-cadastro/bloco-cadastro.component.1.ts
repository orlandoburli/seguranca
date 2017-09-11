import { Utils } from './../../../../plugins/shared';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';
import { BlocoService } from './../bloco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { Subscription } from 'rxjs/Rx';
import { Bloco } from './../bloco.model';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-bloco-cadastro',
  templateUrl: './bloco-cadastro.component.html',
  styleUrls: ['./bloco-cadastro.component.scss']
})
export class BlocoCadastroComponent implements OnInit, OnDestroy, AfterViewInit {

  vo: Bloco = {};

  inscricoes: Subscription[] = [];

  // Colecoes
  itensStatus: SelectGroupOption[];

  // Parametros de rotas
  acao: string;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blocoService: BlocoService,
    private msg: MensagemService) {

    this.vo = Bloco.getInstance();
  }

  ngOnInit() {
    this.itensStatus = [
      { label: "TODOS", value: "" },
      { label: "Ativo", value: "Ativo" },
      { label: "Inativo", value: "Inativo" }
    ];

    let s = this.route.params.subscribe((params: any[]) => {
      this.id = params['id'];
      this.acao = params['acao'];

      if (this.id) {
        let s2 = this.blocoService.buscar(this.id).subscribe((retorno) => {
          this.vo = retorno;
        });
        this.inscricoes.push(s2);
      } else {
        this.vo = Bloco.getInstance();
      }
    });
  }

  ngAfterViewInit() {
    if (!this.isExcluir()) {
      $("#internal_nome").focus();
    } else {
      $("botao-excluir").focus();
    }
  }

  isExcluir() {
    return this.acao && this.acao == "excluir";
  }

  salvar() {
    if (this.id && this.acao == 'editar') {
      let s: Subscription = this.blocoService.atualizar(this.vo, this.id).subscribe((retorno) => {
        if (retorno.success) {
          this.msg.success("Registro alterado com sucesso!").then(() => this.voltar()).catch(() => this.voltar());
        } else {
          this.msg.error(Utils.buildErrorMessage(retorno)).then(() => {
            if (retorno.errors.length > 0) {
              $("#internal_" + retorno.errors[0].fieldName).focus();
            }
          });
        }
        this.inscricoes.push(s);
      });
    } else if (this.acao == 'novo') {

      let s: Subscription = this.blocoService.inserir(this.vo)
        .subscribe((retorno) => {
          if (retorno.success) {
            this.msg.success("Registro incluído com sucesso!").then(() => this.voltar()).catch(() => this.voltar());
          } else {
            this.msg.error(Utils.buildErrorMessage(retorno)).then(() => {
              if (retorno.errors.length > 0) {
                $("#internal_" + retorno.errors[0].fieldName).focus();
              }
            });
          }
        });
      this.inscricoes.push(s);
    }
  }

  excluir() {
    this.msg.confirm("Confirma a EXCLUSÃO deste registro?").then(() => {
      let s: Subscription = this.blocoService.excluir(this.id).subscribe((retorno) => {
        if (retorno.success) {
          this.msg.success("Registro excluído com sucesso!").then(() => this.voltar()).catch(() => this.voltar());
        } else {
          this.msg.error(Utils.buildErrorMessage(retorno)).then(() => {
            if (retorno.errors.length > 0) {
              $("#internal_" + retorno.errors[0].fieldName).focus();
            }
          });
        }
      });
      this.inscricoes.push(s);
    }).catch(() => {
      // Do nothing.
    });
  }

  voltar() {
    this.router.navigate([this.route.parent.parent.routeConfig.path]);
  }


  ngOnDestroy() {
    // Remove as inscricoes
    for (let s of this.inscricoes) {
      s.unsubscribe();
    }
  }

}
