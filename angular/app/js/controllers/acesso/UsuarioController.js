'use strict';

controllers.controller('UsuarioController', ['$scope', 'GenericController', 'MensagemService', 'ConsultaService', function($scope, GenericController, MensagemService, ConsultaService) {
    // Filtro padrao
    $scope.padrao = function() {
        $scope.filter.ativo = "Ativo";  
    }

    $scope.defaultSort = { "nome" : "asc" };

    // Controller genérico
    GenericController.buildController($scope, "acesso", "usuario"); 
    
    if ($scope.isInclusao() ) {
        $scope.vo.perfil = "";
        $scope.vo.ativo = "Ativo";
    }

    // Carrega os perfis
    ConsultaService.pesquisar("perfil", {
            "filtro" : {
                "ativo" : "Ativo" 
            },
            "order" : { "nome" : "asc" }
        })
        .then(function(dados) {
            $scope.perfis = dados.lista;
        }).catch(function(error) {
        	MensagemService.erro("Erro ao buscar registros!", "Mensagem: " + error);
        });
}]);