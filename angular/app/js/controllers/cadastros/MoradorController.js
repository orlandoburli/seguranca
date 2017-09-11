controllers.controller('MoradorController', ['$scope', 'GenericController', 'ConsultaService', 'MensagemService', 'EstadoService', 'CepService', function($scope, GenericController, ConsultaService, MensagemService, EstadoService, CepService) {

	// Filtro padrao
    $scope.padrao = function() {
    	
    }


    $scope.defaultSort = { "pessoa.nome" : "asc" };

	// Controller genérico
	GenericController.buildController($scope, "cadastros", "morador");
    
    if ($scope.isInclusao() ) {
        // $scope.vo.morador = "Não"
    }

    // Busca tipos de pessoa (moradores)
    ConsultaService.pesquisar("tipopessoa", {
        "filtro" : {
            "ativo" : "Ativo",
            "morador" : "Sim"
        },
        "order" : { "nome" : "asc" }
    })
    .then(function(dados) {
        $scope.tiposPessoa = dados.lista;
    }).catch(function(error) {
        MensagemService.erro("Erro ao buscar registros!", "Mensagem: " + error);
    });

    // Busca unidades
    ConsultaService.pesquisar("unidade", {
        "filtro" : {
            "ativo" : "Ativo"
        },
        "order" : { "numero" : "asc" }
    })
    .then(function(dados) {
        $scope.unidades = dados.lista;
    }).catch(function(error) {
        MensagemService.erro("Erro ao buscar registros!", "Mensagem: " + error);
    });

    if (!$scope.isConsulta()) {
        EstadoService.estados()
            .then(function(dados) {
                $scope.estados = dados;
            }).catch(function(error) {
                MensagemService.erro("Erro ao buscar estados!", "Mensagem: " + error);
            });
    }

    // Busca CEP
    $scope.buscarCep = function() {
        if ($scope.vo.pessoa.cep) {
            if ($scope.vo.pessoa.endereco) {
                MensagemService.confirmacao("Confirmação", "Os dados de endereço atuais serão substituídos, caso o CEP seja encontrado! Deseja continuar?", function() {
                    $scope.doBuscarCep();
                });
            } else {
                $scope.doBuscarCep();
            }
        } else {
            MensagemService.erro("Informe um CEP válido!");
        }
    }

    $scope.doBuscarCep = function() {
        CepService.buscarPorCep($scope.vo.pessoa.cep)
            .then(function(dados) {
                console.log(dados);
                if (dados.erro) {
                    MensagemService.erro("Atenção!", "CEP " + $scope.vo.pessoa.cep + " não encontrado. Verifique se o mesmo está digitado corretamente.");
                } else {
                    $scope.vo.pessoa.endereco = dados.logradouro;
                    $scope.vo.pessoa.bairro = dados.bairro;
                    $scope.vo.pessoa.cidade = dados.localidade;
                    $scope.vo.pessoa.uf = dados.uf;
                }
                
            }).catch(function(error) {
                MensagemService.erro("Erro ao buscar CEP!", "Mensagem: " + error);
            });
    }
}]);