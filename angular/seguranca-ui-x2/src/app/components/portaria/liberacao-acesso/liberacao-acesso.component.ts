import { Router } from '@angular/router';
import { Pessoa } from './../../cadastros/pessoa/pessoa.model';
import { SelectItemEvent } from './../../../plugins/plugins.api';
import { LiberacaoAcesso } from './../liberacao-acesso.model';
import { TipoPessoa } from './../../cadastros/tipo-pessoa/tipo-pessoa.model';
import { Subscription } from 'rxjs/Rx';
import { TipoPessoaService } from './../../cadastros/tipo-pessoa/tipo-pessoa.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-liberacao-acesso',
  templateUrl: './liberacao-acesso.component.html',
  styleUrls: ['./liberacao-acesso.component.css']
})
export class LiberacaoAcessoComponent implements OnInit {

  step: number;

  private liberacao: LiberacaoAcesso = {};

  public inscricoes: Subscription[] = [];

  public TIPO_ACESSO_VISITANTE = "Visitante";
  public TIPO_ACESSO_PRESTADOR = "Prestador de Serviços";

  constructor(
    private router: Router,
    private tipoPessoaService: TipoPessoaService
  ) { }

  ngOnInit() {
    this.inicializar();
  }

  inicializar() {
    // Passo inicial
    this.step = 1;
    this.liberacao = {
      tipoAcesso: "",
      usuario: {},
      moradorLiberacao: {}
    };
  }

  isAcessoPrestador(): boolean {
    return this.liberacao && this.liberacao.tipoAcesso == this.TIPO_ACESSO_PRESTADOR;
  }

  isAcessoVisitante(): boolean {
    return this.liberacao && this.liberacao.tipoAcesso == this.TIPO_ACESSO_VISITANTE;
  }

  selecionarTipoAcesso(tipo: string) {
    this.liberacao.tipoAcesso = tipo;

    $("#modalPessoaConsulta").modal("show");
    $("#modalPessoaConsulta").appendTo("body");
  }

  onSelectPessoa(event: SelectItemEvent<Pessoa>) {
    if (event.item) {
      this.liberacao.pessoa = event.item;
    }
    $("#modalPessoaConsulta").on("hidden.bs.modal", () => {
      $("#modalPessoaCadastro").modal("show");
      $("#modalPessoaCadastro").appendTo("body");
    });
    $("#modalPessoaConsulta").modal("hide");
  }

  onNovaPessoa() {
    $("#modalPessoaConsulta").on("hidden.bs.modal", () => {
      this.router.navigate(['/cadastros/pessoa/novo']);
    });
    $("#modalPessoaConsulta").modal("hide");
  }

  teste() {
    this.step++;

    if (this.step > 3) {
      this.step = 1;
    }
  }

  getFoto() {
    if (!this.liberacao.pessoa.foto || this.liberacao.pessoa.foto == "") {
      return "assets/img/sem_foto_m.png";
    } else {
      return this.liberacao.pessoa.foto;
    }
  }

  abrirCadastro() {
    if (this.liberacao && this.liberacao.pessoa) {
      this.router.navigate(['cadastros/pessoa/editar', this.liberacao.pessoa.id]);
    }
  }

  ngOnDestroy() {
    // Remove as inscricoes
    for (let s of this.inscricoes) {
      s.unsubscribe();
    }
    $("body>#modalPessoaConsulta").remove();
  }
}
