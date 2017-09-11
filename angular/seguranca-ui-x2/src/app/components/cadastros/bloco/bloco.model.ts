export class Bloco {
  id?: string;
  nome?: string;
  ativo?: string;

  static getInstance(): Bloco {
    let vo: Bloco = {};
    vo.ativo = "Ativo";
    return vo;
  }
}
