import { SelectGroupOption } from './forms/select-group/select-group-option';
import { CadastroResponse } from './../components/model/cadastro-response.model';

export class Utils {
  static getRandomNumber() {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }

  static buildErrorMessage<T>(response: CadastroResponse<T>): string {
    //
    let msg = response.message;

    if (response.errors && response.errors.length > 0) {
      msg += '<div class="text-left">';
      msg += '<ul>';

      for (const error of response.errors) {
        msg += '<li>';
        msg += error.message;
        msg += '</li>';
      }
      msg += '</ul>';
      msg += '</div>';
    }

    return msg;
  }
}

export class EnumUtils {

  /**
   * Retorna lista de options para combo Ativo / Inativo
   */
  static getOptionsAtivo(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Ativo', value: 'Ativo' });
    lista.push({ label: 'Inativo', value: 'Inativo' });

    return lista;
  }

  /**
   * Retorna lista de options para Sim / Não
   */
  static getOptionsSimNao(opcaoVazia: string = null): SelectGroupOption[] {

    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Sim', value: 'Sim' });
    lista.push({ label: 'Não', value: 'Não' });

    return lista;
  }

  /**
   * Retorna lista de options para Entrada / Saída
   */
  static getOptionsTipoPorta(opcaoVazia: string = null): SelectGroupOption[] {
    const lista: SelectGroupOption[] = [];

    if (opcaoVazia) {
      lista.push({ label: opcaoVazia, value: '' });
    }

    lista.push({ label: 'Entrada', value: 'Entrada' });
    lista.push({ label: 'Saída', value: 'Saída' });

    return lista;
  }
}
