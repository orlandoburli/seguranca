export class Torre {
  id?: number;
  nome?: string;
  ativo?: string;
  andares?: number;
  unidadesPorAndar?: number;
  terreo?: string;

  static getInstance(): Torre {
    let vo: Torre = {};
    vo.ativo = "Ativo";
    vo.terreo = "Sim";
    return vo;
  }
}
