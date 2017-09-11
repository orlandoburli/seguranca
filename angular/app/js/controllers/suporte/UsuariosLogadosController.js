'use strict'

controllers.controller('UsuariosLogadosController', ['$scope', '$http', '$q', '$interval', 'ngTableParams', 'SuporteService', 'MensagemService', function($scope, $http, $q, $interval, ngTableParams, SuporteService, MensagemService){

	$scope.tableParams = new ngTableParams({
            page: 1, 
            count: 5,
            sorting : $scope.defaultSort,
            defaultSort : "asc"
        }, {
            counts : [],
            total: 0, // length of data
            getData: function ($defer, params) {
            	SuporteService.usuariosLogados() 
					.then(function(dados) {
						params.total(dados.length);
                        return $defer.resolve(dados);
					}).catch(function(error) {
						MensagemService.tratarErro("Erro ao buscar dados!", error);
					});	
		}
    });

    $scope.atualizar = function() {
        $scope.tableParams.page(1);
        $scope.tableParams.reload(); 
    }

    $scope.matarSessao = function(token) {
    	SuporteService.matarSessao(token)
    		.then(function() {
    			// Sucesso
    			$scope.atualizar();
    		}).catch(function(error) {
    			MensagemService.tratarErro("Erro ao matar sessão!", error);
    		});
    }

	$scope.atualizar();


	$interval($scope.atualizar, 5000);

}]);