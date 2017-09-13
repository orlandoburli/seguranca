import { VeiculoService } from './../veiculo.service';
import { Veiculo } from './../veiculo.model';
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
  selector: 'app-veiculo-cadastro',
  templateUrl: './veiculo-cadastro.component.html',
  styleUrls: ['./veiculo-cadastro.component.css']
})
export class VeiculoCadastroComponent extends AbstractCadastroComponent<Veiculo, VeiculoService> {

  inscricoes: Subscription[] = [];

  // Colecoes
  itensStatus: SelectGroupOption[] = EnumUtils.getOptionsAtivo("Selecione uma opção");
  itensUnidades: SelectGroupOption[] = [];
  itensEstados: SelectGroupOption[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veiculoService: VeiculoService,
    private tirarFotoService: TirarFotoService,
    private msg: MensagemService) {
    super(route, router, msg);
  }

  ngOnInit() {
    // Busca a lista de estados
    super.ngOnInit();
  }

  getService(): VeiculoService {
    return this.veiculoService;
  }

  getVoNewInstance(): Veiculo {
    return {
      ativo : "Ativo",
      morador: {}
    }
  }
}
