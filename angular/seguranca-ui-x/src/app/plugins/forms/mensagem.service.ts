import { SweetAlertComponent } from './../../components/sweetalert/sweetalert.component';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { assign } from 'lodash';

import sweetalert, { SweetAlertOptions } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

@Injectable()
export class MensagemService {

  constructor() { }

  confirm(message: string, title: string = "Confirmação") {
    const options : SweetAlertOptions = {
      title: title,
      text: message,
      type: 'question',
      showCancelButton: true,
      showConfirmButton : true,
      confirmButtonText: 'Confirmar',
      cancelButtonText : 'Cancelar'
    };
    return sweetalert(options);
    // return sweetalert(title, message, "question");
  }

  success(message: string, title: string = "Sucesso") {
    return sweetalert(title, message, "success");
  }

  error(message: string, title: string = "Erro") {
    return sweetalert(title, message, "error");
  }

  warn(message: string, title: string = "Alerta") {
    return sweetalert(title, message, "warning");
  }

  info(message: string, title: string = "Informação") {
    return sweetalert(title, message, "info");
  }

}
