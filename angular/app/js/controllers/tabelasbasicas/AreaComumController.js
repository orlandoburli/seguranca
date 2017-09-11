controllers.controller('AreaComumController', ['$scope', 'GenericController', 'ConsultaService', 'MensagemService', function($scope, GenericController, ConsultaService, MensagemService){

	// Filtro padrao
    $scope.padrao = function() {
    	$scope.filter.ativo = "Ativo";	
    }

    $scope.defaultSort = {"nome" : "ASC"};
    
	// Controller genérico
	GenericController.buildController($scope, "cadastros", "areacomum");

	if ($scope.isInclusao()) {
		$scope.vo.ativo = 'Ativo';
	}

	$scope.tiposPorta = ["Entrada", "Saída"];
    
    if ($scope.isInclusao() ) {
    	$scope.vo.ativo = "Ativo";
    }	

}]);