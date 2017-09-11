'use strict';

services.service('MensagemService', ['SweetAlert', function(SweetAlert){
	var services = {
		sucesso : function(titulo, mensagem) {
			SweetAlert.swal(titulo, mensagem, "success");
		},
		erro : function(titulo, mensagem) {
			SweetAlert.swal({
				title : titulo, 
				text : mensagem, 
				type: "error",
				html : true
			});
		},
		confirmacao : function(titulo, mensagem, sim, nao) {
	        SweetAlert.swal({
	            title: titulo,
	            text: mensagem,
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: "Sim",
	            cancelButtonText: "Não",
	            closeOnConfirm: true,
	            closeOnCancel: true
	        }, function (isConfirm) {
	            if (isConfirm) {
	            	if (sim) {
	            		sim();	
	            	}
	            } else {
	                if (nao) {
	                	nao();
	                }
	            }
	        });
		},
		tratarErro : function(titulo, erro) {
			var texto  = erro;
			
            if (erro.data && erro.data.message) {
                texto = erro.data.message;
            } else if (erro.status == 401) {
                texto = "É necessário autenticar no sistema!";
            } else if (erro.status == 403) {
            	texto = "Você não possui acesso a este recurso!";
            } else if (erro.status == 404) {
                texto = "Página não encontrada! Tente em alguns instantes.";
            } else if (erro.status == 503) {
            	texto = "Serviço temporariamente indisponível!";
            } else if (erro.data && Array.isArray(erro.data)) {
            	texto = "<ul>";
            	for (var i = erro.data.length - 1; i >= 0; i--) {
            		texto += "<li>" + erro.data[i].message + "</li>";
            	}
            	texto += "</ul>";

                if (erro.data[0].fieldName) {
                    $("#" + erro.data[0].fieldName).focus();
	            }
            }

            services.erro(titulo, "Mensagem: " + texto);
		}
	};

	return services;
}])