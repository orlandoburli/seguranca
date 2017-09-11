import { Pessoa } from './../cadastros/pessoa/pessoa.model';
import { AreaComum } from './../tabelas-basicas/area-comum/area-comum.model';
import { Unidade } from './../cadastros/unidade/unidade.model';
import { Morador } from './../cadastros/morador/morador.model';
import { Porta } from './../tabelas-basicas/porta/porta.model';
import { Usuario } from './../acesso/usuario/usuario.model';

export class LiberacaoAcesso {
  id?: string;
  dataHora?: string;
  usuario?: Usuario;
  pessoa?: Pessoa;
  porta?: Porta;
  tipoAcesso?: string;
  preLiberacao?: any;
  moradorLiberacao?: Morador;
  tipoDestino?: string;
  unidadeDestino?: Unidade;
  areaComumDestino?: AreaComum;
  formaAutorizacao?: string;
  observacoes?: string;
  foto?: string;
}
