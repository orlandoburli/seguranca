'use strict';

services.factory("LoginService", ["$resource", "$q", "$http", "ParametrosApp", "md5", function($resource, $q, $http, ParametrosApp, md5){
	var service = {};

	service.ping = function() {
		var url = ParametrosApp.host + "/ping";
		
		var promise = $http.post(url);

		return $q(function(resolve, reject) {
			promise.then(function(retorno) {
				if (retorno.data == "OK") {
					resolve();
				} else {
					reject(retorno.data);	
				}
			}).catch(function(error) {
				reject(error);
			});
		});
	}

	service.acesso = function (usuario, senha) {
		if (!usuario || !senha) {
			return $q(function(resolve, reject) {
				reject("Informe o usuário e a senha!");
			});
		}

		var url = ParametrosApp.host + "/acesso?login=" + usuario + "&senha=" + md5.createHash(senha);

		var promise = $http.post(url);

		return $q(function(resolve, reject) {
			promise.then(function(retorno) {
				resolve(retorno.data);
			}).catch(function(error) {
				reject(error);
			});	
		});
	}

	return service;
}])