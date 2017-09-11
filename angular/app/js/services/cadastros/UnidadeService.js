services.factory('UnidadeService', ['$http', '$q', 'ParametrosApp', function($http, $q, ParametrosApp) {
	
	return {
		multiplos : function(idTorre, idBloco) {
			var q = $q.defer();

			$http.post(ParametrosApp.host + "/unidade/multiplos", {
				"idTorre" : idTorre,
				"idBloco" : idBloco
			}).then(function(data) {
				q.resolve(data.data);
			}).catch(function(error) {
				q.reject(error);
			});

			return q.promise;
		}
	};
}])