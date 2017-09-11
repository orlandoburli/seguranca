services.factory('EstadoService', ['$http', '$q', 'ParametrosApp', function($http, $q, ParametrosApp) {
	
	return {
		estados : function() {
			var q = $q.defer();

			$http.get(ParametrosApp.host + "/pessoa/estados")
				.then(function(data) {
					q.resolve(data.data);
				}).catch(function(error) {
					q.reject(error);
				});

			return q.promise;
		}
	};
}])