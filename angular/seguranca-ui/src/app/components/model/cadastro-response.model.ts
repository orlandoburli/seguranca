export class ErrorField {
  fieldName: string;
  message: string;
}

// Objeto que faz o parse do retorno de um webservice rest de cadastro
export class CadastroResponse<T> {
  vo: T;
  success: boolean;
  message: string;
  errors: ErrorField[];
}
