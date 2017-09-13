import { TipoPessoaService } from './../../tipo-pessoa/tipo-pessoa.service';
import { UnidadeService } from './../../unidade/unidade.service';
import { MoradorService } from './../morador.service';
import { Morador } from './../morador.model';
import { TirarFotoService } from './../../../../plugins/camera/tirar-foto.service';
import { EstadoService } from './../../estado/estado.service';
import { TipoPessoa } from './../../tipo-pessoa/tipo-pessoa.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';

import { SelectGroupOption } from './../../../../plugins/forms/select-group/select-group-option';
import { Utils, EnumUtils } from './../../../../plugins/shared';
import { MensagemService } from './../../../../plugins/forms/mensagem.service';

import { AbstractCadastroComponent } from '../../../geral/crud/abstract-cadastro.component';

@Component({
  selector: 'app-morador-cadastro',
  templateUrl: './morador-cadastro.component.html',
  styleUrls: ['./morador-cadastro.component.css']
})
export class MoradorCadastroComponent extends AbstractCadastroComponent<Morador, MoradorService> implements OnInit {

  inscricoes: Subscription[] = [];

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo('Selecione uma opção');
  itensUnidades: SelectGroupOption[] = [];
  itensEstados: SelectGroupOption[] = [];
  itensTipoPessoa: SelectGroupOption[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moradorService: MoradorService,
    private estadoService: EstadoService,
    private unidadeService: UnidadeService,
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

      const s2 = this.unidadeService.getListAtivos().subscribe((retorno2) => {
        this.itensUnidades.push({ label: 'Selecione a unidade', value: '' });

        for (const unidade of retorno2.lista) {
          this.itensUnidades.push({ label: unidade.numero, value: unidade.id.toString() });
        }

        const s3 = this.tipoPessoaService.getListAtivosMorador().subscribe((retorno3) => {
          this.itensTipoPessoa.push({ label: 'Selecione o tipo de pessoa', value: '' });

          for (const tipo of retorno3.lista) {
            this.itensTipoPessoa.push({ label: tipo.nome, value: tipo.id.toString() });
          }

          super.ngOnInit();
        });

        this.inscricoes.push(s3);
      });

      this.inscricoes.push(s2);
    });

    this.inscricoes.push(s);
  }

  beforeVisualizar(vo: Morador) {
    if (!vo.pessoa.foto || vo.pessoa.foto === '') {
      vo.pessoa.foto = 'assets/img/sem_foto_m.png';
    }
  }

  getService(): MoradorService {
    return this.moradorService;
  }

  getVoNewInstance(): Morador {
    return {
      pessoa: { tipoPessoa: {} },
      unidade: {}
    };
  }

  getFoto() {
    if (!this.vo.pessoa.foto || this.vo.pessoa.foto === '') {
      return 'assets/img/sem_foto_m.png';
    } else {
      return this.vo.pessoa.foto;
    }
  }

  tirarFoto() {
    const idVideoSource = this.tirarFotoService.retornarDeviceFoto('cadastro_morador');

    this.tirarFotoService.tirarFoto(idVideoSource)
      .then((fotoBase64) => {
        this.vo.pessoa.foto = fotoBase64;
      }).catch((mensagem) => {
        if (mensagem) {
          this.msg.nofiticationError(mensagem);
        }
      });
  }

  limparFoto() {
    this.vo.pessoa.foto = '';
  }
}
