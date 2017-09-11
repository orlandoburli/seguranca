// Objeto que contém todos os parametros de um filtro
export class ConsultaRequest {
  filtro: any;
  order: any;
  pageNumber: number;
  pageSize: number;

  constructor(filtro: any, order: any, pageNumber: number, pageSize: number) {
    this.filtro = filtro;
    this.order = order;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
