controllers.controller('TorreController', ['$scope', 'GenericController', function($scope, GenericController) {
	// Filtro padrao
    $scope.padrao = function() {
    	$scope.filter.ativo = "Ativo";	
    }

    $scope.defaultSort = { "nome" : "asc" };
    
	// Controller genérico
	GenericController.buildController($scope, "cadastros", "torre");

	if ($scope.isInclusao()) {
		$scope.vo.ativo = 'Ativo';
		$scope.vo.terreo = 'Sim';
	}
    
    if ($scope.isInclusao() ) {
    	$scope.vo.ativo = "Ativo";
    }
}]);