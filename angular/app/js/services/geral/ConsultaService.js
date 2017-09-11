'use strict';

services.factory("ConsultaService", ["$resource", "$q", "$http", "ParametrosApp", function($resource, $q, $http, ParametrosApp){
	
	var service = {};

	service.pesquisar = function(entidade, parametrosPesquisa) {
		var promise = $http.post(ParametrosApp.host + "/" + entidade + "/pesquisar", parametrosPesquisa);

		return $q(function(resolve, reject) {
			promise.then(function(retorno) {
				resolve(retorno.data);
			}).catch(function(error) {
				reject(error);
			});	
		});
	}

	service.simples = function(url) {
		var promise = $http.get(ParametrosApp.host + "/" + url);

		return $q(function(resolve, reject) {
			promise.then(function(retorno) {
				resolve(retorno.data);
			}).catch(function(error) {
				reject(error);
			});	
		});
	}

	return service;
}]);