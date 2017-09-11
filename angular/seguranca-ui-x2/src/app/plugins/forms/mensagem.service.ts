import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

declare var swal: any;
declare var $: any;

@Injectable()
export class MensagemService {

  private defaultTimerNotification: number = 4000;

  constructor() { }

  confirm(message: string, title: string = "Confirmação") {
    const options = {
      title: title,
      text: message,
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    };
    return swal(options);
  }

  success(message: string, title: string = "Sucesso") {
    return swal({
      title: title,
      text: message,
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success btn-fill",
      type: "success"
    });
  }

  error(message: string, title: string = "Erro") {
    return swal(title, message, "error");
  }

  warn(message: string, title: string = "Alerta") {
    return swal(title, message, "warning");
  }

  info(message: string, title: string = "Informação") {
    return swal(title, message, "info");
  }

  nofiticationSucess(message: string, timer: number = this.defaultTimerNotification) {
    $.notify({
      icon: "ti-check",
      message: "<p><strong>Sucesso</strong></p>" + message
    }, {
        type: 'success',
        timer: timer,
        placement: {
          from: 'top',
          align: 'right'
        }
      });
  }

  nofiticationError(message: string, timer: number = this.defaultTimerNotification) {
    $.notify({
      icon: "ti-na",
      message: "<p><strong>Erro</strong></p>" + message
    }, {
        type: 'danger',
        timer: timer,
        placement: {
          from: 'top',
          align: 'right'
        }
      });
  }

  nofiticationWarning(message: string, timer: number = this.defaultTimerNotification) {
    $.notify({
      icon: "ti-alert",
      message: "<p><strong>Alerta</strong></p>" + message
    }, {
        type: 'warning',
        timer: timer,
        placement: {
          from: 'top',
          align: 'right'
        }
      });
  }

  nofiticationInfo(message: string, timer: number = this.defaultTimerNotification) {
    $.notify({
      icon: "ti-info-alt",
      message: "<p><strong>Informação</strong></p>" + message
    }, {
        type: 'info',
        timer: timer,
        placement: {
          from: 'top',
          align: 'right'
        }
      });
  }

}
