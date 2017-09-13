export class Perfil {
  id?: string;
  nome?: string;
  ativo?: string;

  static getInstance() {
    return { ativo: "Ativo" };
  }
}
