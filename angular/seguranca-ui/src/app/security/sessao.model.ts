import { Empresa } from './../components/acesso/empresa/empresa.model';
import { Usuario } from './../components/acesso/usuario/usuario.model';

/**
 * Classe que representa a sessao do usuario no servidor
 */
export class SessaoUsuario {
  id?: string;
  empresa?: Empresa;
  dataCriacao?: string;
  ultimaInteracao?: string;
  enderecoIp?: string;
  hostName?: string;
  usuario?: Usuario;
}
