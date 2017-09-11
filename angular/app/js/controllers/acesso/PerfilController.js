 'use strict';

controllers.controller('PerfilController', ['$scope', 'GenericController', function($scope, GenericController) {
    
    // Filtro padrao
    $scope.padrao = function() {
    	$scope.filter.ativo = "Ativo";	
    }

    // Ordenação padrão da grid
    $scope.defaultSort = { "nome" : "asc" };

    // Controller genérico
    GenericController.buildController($scope, "acesso", "perfil");
    
    if ($scope.isInclusao() ) {
    	$scope.vo.ativo = "Ativo";
    }
}]);