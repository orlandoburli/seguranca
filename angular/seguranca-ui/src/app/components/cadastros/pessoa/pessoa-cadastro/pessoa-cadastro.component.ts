import { ConsultaResponse } from './../../../model/consulta-response.model';
import { TipoPessoaService } from './../../tipo-pessoa/tipo-pessoa.service';
import { TirarFotoService } from './../../../../plugins/camera/tirar-foto.service';
import { EstadoService } from './../../estado/estado.service';
import { TipoPessoa } from './../../tipo-pessoa/tipo-pessoa.model';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../pessoa.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { Utils, EnumUtils } from './../../../../plugins/shared';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';

import { AbstractCadastroComponent } from '../../../geral/crud/abstract-cadastro.component';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent extends AbstractCadastroComponent<Pessoa, PessoaService> implements OnInit {

  inscricoes: Subscription[] = [];

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo('Selecione uma opção');
  itensEstados: SelectGroupOption[] = [];
  itensTipoPessoa: SelectGroupOption[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private estadoService: EstadoService,
    private tipoPessoaService: TipoPessoaService,
    private tirarFotoService: TirarFotoService,
    private msg: MensagemService) {
    super(route, router, msg);
  }

  ngOnInit() {
    // Busca a lista de estados
    const s = this.estadoService.getList().subscribe((retorno) => {
      this.itensEstados.push({ label: 'Selecione um estado', value: '' });

      for (const estado of retorno.lista) {
        this.itensEstados.push({ label: estado.nome, value: estado.id });
      }

      const s2 = this.tipoPessoaService.getListAtivosNaoMorador().subscribe((retorno2) => {
        this.itensTipoPessoa.push({ label: 'Selecione o tipo de pessoa', value: '' });

        for (const tipo of retorno2.lista) {
          this.itensTipoPessoa.push({ label: tipo.nome, value: tipo.id.toString() });
        }

        super.ngOnInit();
      });

      this.inscricoes.push(s2);

    });

    this.inscricoes.push(s);
  }

  beforeVisualizar(vo: Pessoa) {
    if (!vo.foto || vo.foto === '') {
      vo.foto = 'assets/img/sem_foto_m.png';
    }
  }

  getService(): PessoaService {
    return this.pessoaService;
  }

  getVoNewInstance(): Pessoa {
    return { tipoPessoa: {} }
  }

  getFoto() {
    if (!this.vo.foto || this.vo.foto === '') {
      return 'assets/img/sem_foto_m.png';
    } else {
      return this.vo.foto;
    }
  }

  tirarFoto() {
    // Teste
    const idVideoSource = this.tirarFotoService.retornarDeviceFoto('cadastro_pessoa');

    this.tirarFotoService.tirarFoto(idVideoSource)
      .then((fotoBase64) => {
        this.vo.foto = fotoBase64;
      }).catch((mensagem) => {
        if (mensagem) {
          this.msg.nofiticationError(mensagem);
        }
      });
  }

  limparFoto() {
    this.vo.foto = '';
  }
}
