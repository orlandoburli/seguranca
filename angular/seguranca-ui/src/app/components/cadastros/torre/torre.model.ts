export class Torre {
  id?: string;
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
