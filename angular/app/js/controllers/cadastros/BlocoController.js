controllers.controller('BlocoController', ['$scope', 'GenericController', function($scope, GenericController) {

	// Filtro padrao
    $scope.padrao = function() {
    	$scope.filter.ativo = "Ativo";	
    }

    $scope.defaultSort = { "nome" : "asc" };

	// Controller genérico
	GenericController.buildController($scope, "cadastros", "bloco");
    
    if ($scope.isInclusao() ) {
    	$scope.vo.ativo = "Ativo";
    }
}]);