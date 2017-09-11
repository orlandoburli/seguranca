import { Morador } from './../morador/morador.model';

export class Veiculo {
  id?: string;
  placa?: string;
  marca?: string;
  modelo?: string;
  cor?: string;
  ano?: number;
  ativo?: string;
  morador?: Morador;
}
