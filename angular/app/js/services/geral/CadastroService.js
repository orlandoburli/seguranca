'use strict';

services.factory('CadastroService', ["$resource", "ParametrosApp", function($resource, ParametrosApp) {
	var service = {};

	service.resource = function(entidade) {
		return $resource(ParametrosApp.host + "/" + entidade + "/:id", null, {
			update : {
				method : "PUT"
			}
		});
	}

	return service;
}]);