import { Torre } from './../torre/torre.model';
import { Bloco } from './../bloco/bloco.model';

export class Unidade {

  id?: string;
  numero?: string;
  ativo?: string;
  bloco?: Bloco;
  torre?: Torre;

  static getInstance(): Unidade {
    const vo: Unidade = {};
    vo.ativo = 'Ativo';
    vo.bloco = {};
    vo.bloco.id = undefined;
    vo.torre = {};
    vo.torre.id = undefined;
    return vo;
  }
}
