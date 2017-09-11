// Objeto que faz o parse do retorno de um webservice rest de consulta
export class ConsultaResponse<T> {
  lista: T[];
  total: number;
}
