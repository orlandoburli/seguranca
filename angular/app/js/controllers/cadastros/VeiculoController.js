controllers.controller('VeiculoController', ['$scope', 'GenericController', 'ConsultaService', 'MensagemService', function($scope, GenericController, ConsultaService, MensagemService){
	// Filtro padrao
    $scope.padrao = function() {
    	$scope.filter.ativo = "Ativo";	
    }

    $scope.defaultSort = { "placa" : "asc" };
    
	// Controller genérico
	GenericController.buildController($scope, "cadastros", "veiculo");

	if ($scope.isInclusao()) {
		$scope.vo.ativo = 'Ativo';
	}
    
    if ($scope.isInclusao() ) {
    	$scope.vo.ativo = "Ativo";
    }

    $scope.moradores = [];

    // Busca unidades
    ConsultaService.pesquisar("morador", {
        "filtro" : {
            "ativo" : "Ativo"
        },
        "order" : { "pessoa.nome" : "asc" }
    }).then(function(dados) {
        $scope.moradores = dados.lista;
    }).catch(function(error) {
        MensagemService.erro("Erro ao buscar registros!", "Mensagem: " + error);
    });


}]);