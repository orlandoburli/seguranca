import { Perfil } from './../perfil/perfil.model';

export class Usuario {
  id?: string;
  nome?: string;
  ativo?: string;
  login?: string;
  senha?: string;
  confirmacaoSenha?: string;
  perfil?: Perfil;
}
