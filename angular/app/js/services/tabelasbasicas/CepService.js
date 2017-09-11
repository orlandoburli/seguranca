services.factory('CepService', ['$http', '$q', 'ParametrosApp', function($http, $q, ParametrosApp) {
	
	return {
		buscarPorCep : function(cep) {
			var q = $q.defer();

			$http.get("https://viacep.com.br/ws/" + cep + "/json/")
				.then(function(data) {
					q.resolve(data.data);
				}).catch(function(error) {
					q.reject(error);
				});

			return q.promise;
		}
	};
}])