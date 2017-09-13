import { TipoPessoa } from './../tipo-pessoa/tipo-pessoa.model';

export class Pessoa {
  id?: string;
  nome?: string;
  rg?: string;
  orgaoRg?: string;
  tipoPessoa?: TipoPessoa;
  cpf?: string;
  cnh?: string;
  celular1?: string;
  celular2?: string;
  fone1?: string;
  fone2?: string;
  cep?: string;
  endereco?: string;
  bairro?: string;
  complemento?: string;
  cidade?: string;
  uf?: string;
  observacoes?: string;
  foto?: string;
}
