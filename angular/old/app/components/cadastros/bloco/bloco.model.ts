export class Bloco {
  id?: number;
  nome?: string;
  ativo?: string;

  static getInstance(): Bloco {
    let vo: Bloco = {};
    vo.ativo = "Ativo";
    return vo;
  }
}
