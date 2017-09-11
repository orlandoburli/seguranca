services.factory('SuporteService', ['$q', '$http', 'ParametrosApp', function($q, $http, ParametrosApp){
	
	var services = {};

	services.usuariosLogados = function() {
		var promise = $http.get(ParametrosApp.host + "/suporte/usuarios-logados");

		return $q(function(resolve, reject) {
			promise.then(function(retorno) {
				resolve(retorno.data);
			}).catch(function(error) {
				reject(error);
			});	
		});
	}

	services.matarSessao = function(token) {
		var promise = $http.post(ParametrosApp.host + "/suporte/matar-sessao/" + token);

		return $q(function(resolve, reject) {
			promise.then(function(retorno) {
				resolve(retorno.data);
			}).catch(function(error) {
				reject(error);
			});	
		});	
	}

	return services;
}])