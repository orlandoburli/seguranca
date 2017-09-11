'use strict';

services.factory("PerfilService", ["$resource", "ParametrosApp", function($resource, ParametrosApp){
	return $resource(ParametrosApp.host + "/perfil/:id", null, {
		update : {
			method : "PUT"
		}
	});
}]);