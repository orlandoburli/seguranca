import { Pessoa } from './../pessoa/pessoa.model';
import { Unidade } from './../unidade/unidade.model';

export class Morador {
  id?: string;
  pessoa?: Pessoa;
  unidade?: Unidade;
}
