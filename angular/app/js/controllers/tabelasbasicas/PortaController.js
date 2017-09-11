controllers.controller('PortaController', ['$scope', 'GenericController', 'ConsultaService', 'MensagemService', function($scope, GenericController, ConsultaService, MensagemService){
	// Filtro padrao
    $scope.padrao = function() {
    	$scope.filter.ativo = "Ativo";	
    }

    $scope.defaultSort = { "nome" : "asc" };
    
	// Controller genérico
	GenericController.buildController($scope, "cadastros", "porta");

	if ($scope.isInclusao()) {
		$scope.vo.ativo = 'Ativo';
	}

	$scope.tiposPorta = ["Entrada", "Saída"];
    
    if ($scope.isInclusao() ) {
    	$scope.vo.ativo = "Ativo";
    }

}]);