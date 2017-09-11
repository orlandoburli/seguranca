import { Utils } from './../../../plugins/shared';
import { MensagemService } from './../../../plugins/forms/mensagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { AbstractCrudService } from '../../services/abstract-crud.service';

declare var $: any;

export abstract class AbstractCadastroComponent<T, S extends AbstractCrudService<T>> implements OnInit, AfterViewInit, OnDestroy {
  @Input() public vo: T;

  public inscricoes: Subscription[] = [];

  @Input() public acao: string;
  public id: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _msg: MensagemService) {
    this.vo = this.getVoNewInstance();
  }

  ngOnInit() {
    const s = this._route.params.subscribe((params: any[]) => {
      this.id = params['id'];
      this.acao = params['acao'];

      if (this.id) {
        const s2 = this.getService().buscar(this.id).subscribe((retorno) => {
          this.vo = retorno;
          this.beforeVisualizar(this.vo);
        });
        this.inscricoes.push(s2);
      } else {
        this.vo = this.getVoNewInstance();
        this.beforeVisualizar(this.vo);
      }
    });
    this.inscricoes.push(s);
  }

  ngAfterViewInit() {
    if (!this.isExcluir()) {
      // TODO Pegar o primeiro input
      $('#internal_nome').focus();
    } else {
      $('botao-excluir').focus();
    }
  }

  beforeVisualizar(vo: T) {
    //
  }

  // Depreciado.
  isExcluir() {
    return this.isDesabilitar();
  }

  isDesabilitar() {
    return this.acao && (this.acao === 'excluir' || this.acao === 'visualizar');
  }

  /**
   * Retorna o objeto service
   */
  abstract getService(): S;

  /**
   * Retorna uma instancia vazia do VO
   */
  abstract getVoNewInstance(): T;

  salvar() {
    if (this.id && this.acao === 'editar') {
      const s: Subscription = this.getService().atualizar(this.vo, this.id).subscribe((retorno) => {
        if (retorno.success) {
          this._msg.nofiticationInfo('Registro alterado com sucesso!');
          this.voltar();
        } else {
          this._msg.error(Utils.buildErrorMessage(retorno)).then(() => {
            if (retorno.errors.length > 0) {
              $('#internal_' + retorno.errors[0].fieldName).focus();
            }
          });
        }
      }, (error) => {
        this._msg.error(Utils.buildErrorMessage(error)).then(() => {
          if (error.errors && error.errors.length > 0) {
            $('#internal_' + error.errors[0].fieldName).focus();
          }
        });
      });

      this.inscricoes.push(s);

    } else if (this.acao === 'novo') {

      const s: Subscription = this.getService().inserir(this.vo)
        .subscribe((retorno) => {
          if (retorno.success) {
            this._msg.nofiticationInfo('Registro incluído com sucesso!');
            this.voltar();
          } else {
            this._msg.error(Utils.buildErrorMessage(retorno)).then(() => {
              if (retorno.errors.length > 0) {
                $('#internal_' + retorno.errors[0].fieldName).focus();
              }
            });
          }
        }, (error) => {
          this._msg.error(Utils.buildErrorMessage(error)).then(() => {
            if (error.errors && error.errors.length > 0) {
              $('#internal_' + error.errors[0].fieldName).focus();
            }
          });
        });
      this.inscricoes.push(s);
    }
  }

  excluir() {
    this._msg.confirm('Confirma a EXCLUSÃO deste registro?').then(() => {
      const s: Subscription = this.getService().excluir(this.id).subscribe((retorno) => {
        if (retorno.success) {
          this._msg.nofiticationInfo('Registro excluído com sucesso!');
          this.voltar();
        } else {
          this._msg.error(Utils.buildErrorMessage(retorno)).then(() => {
            if (retorno.errors.length > 0) {
              $('#internal_' + retorno.errors[0].fieldName).focus();
            }
          });
        }
      }, (retorno) => {
        this._msg.error(Utils.buildErrorMessage(retorno)).then(() => {
          if (retorno.errors.length > 0) {
            $('#internal_' + retorno.errors[0].fieldName).focus();
          }
        });
      });
      this.inscricoes.push(s);
    }).catch(() => {
      // Do nothing.
    });
  }

  voltar() {
    this._router.navigate([this._route.parent.parent.routeConfig.path]);
  }

  ngOnDestroy() {
    // Remove as inscricoes
    for (const s of this.inscricoes) {
      s.unsubscribe();
    }
  }

}
