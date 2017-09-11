export class TipoPessoa {
  id?: string;
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
