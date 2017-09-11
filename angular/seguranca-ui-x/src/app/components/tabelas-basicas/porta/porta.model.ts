export class Porta {
  id?: number;
  nome?: string;
  ativo?: string;
  tipo?: string;
  comando?: string;

  static getInstance(): Porta {
    let vo: Porta = {};
    vo.ativo = "Ativo";
    return vo;
  }
}
