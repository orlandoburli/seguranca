controllers.controller('TipoPessoaController', ['$scope', 'GenericController', function($scope, GenericController) {

	// Filtro padrao
    $scope.padrao = function() {
    	$scope.filter.ativo = "Ativo";
        $scope.filter.morador = "";
    }

    $scope.defaultSort = { "nome" : "asc" };

	// Controller genérico
	GenericController.buildController($scope, "cadastros", "tipopessoa");
    
    if ($scope.isInclusao() ) {
    	$scope.vo.ativo = "Ativo";
        $scope.vo.morador = "Não"
    }
}]);