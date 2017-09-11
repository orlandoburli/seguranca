export class TipoPessoa {
  id?: number;
  nome?: string;
  ativo?: string;
  morador?: string;

  static getInstance(): TipoPessoa {
    let vo = {
      ativo : "Ativo",
      morador : ""
    };
    return vo;
  }
}
