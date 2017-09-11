controllers.controller('LiberacaoController', ['$scope', '$timeout', 'ngTableParams', 'GenericController', 'ConsultaService', 'MensagemService', function($scope, $timeout, ngTableParams, GenericController, ConsultaService, MensagemService) {

	// Controller genérico
	// GenericController.buildController($scope, "portaria", "liberacao");

	var AREA_COMUM = "Área Comum";
	var UNIDADE = "Unidade";

	var AUTORIZACAO_INTERFONE = "Interfone";
	var AUTORIZACAO_DOCUMENTO_PORTARIA = "Documento deixado na portaria";

	$scope.AREA_COMUM = AREA_COMUM;
	$scope.UNIDADE = UNIDADE;

	$scope.tiposAcesso = ["Visitante", "Prestador de Serviços"];

	$scope.tiposDestino = [AREA_COMUM, UNIDADE];

	$scope.formasAutorizacao = [AUTORIZACAO_INTERFONE, AUTORIZACAO_DOCUMENTO_PORTARIA];

	$scope.etapa = 1;
	$scope.etapaMaximo = 7;

	$scope.limpar = function() {
		$scope.vo = {};
	}

	$scope.avancar = function() {
		if ($scope.etapa < $scope.etapaMaximo) {
			$scope.etapa += 1;
		}
	}

	$scope.voltar = function() {
		if ($scope.etapa > 1) {
			$scope.etapa -= 1;
		}
	}

	$scope.selecionarTipo = function(tipo) {
		$scope.vo.tipoAcesso = tipo;
		$scope.avancar();
	}

	$scope.selecionarPorta = function(porta) {
		$scope.vo.porta = porta;
		$scope.inicializarMorador();
		$scope.avancar();

		$timeout(function() {
			$("#inputFiltroMoradorGeral").focus();
		}, 1000);
	}

	$scope.selecionarMorador = function(morador) {
		$scope.vo.morador = morador;
		$scope.avancar();
	}

	$scope.selecionarTipoDestino = function(tipoDestino) {
		$scope.vo.tipoDestino = tipoDestino;

		if (tipoDestino == AREA_COMUM) {
			// Seleciona a área comum
			$scope.vo.unidadeDestino = null;
		} else if (tipoDestino == UNIDADE) {
			// Avança direto, pois o destino é a unidade
			$scope.vo.unidadeDestino = $scope.vo.morador.unidade;
			$scope.vo.areaComumDestino = null;
			$scope.avancar();
		}
	}

	$scope.selecionarAreaComum = function(areaComumDestino) {
		$scope.vo.areaComumDestino = areaComumDestino;
		$scope.avancar();
	}

	$scope.selecionarFormaAutorizacao = function(formaAutorizacao) {
		$scope.vo.formaAutorizacao = formaAutorizacao;
		$scope.avancar();
	}

	// Busca unidades
    ConsultaService.simples("liberacao/unidades")
	    .then(function(dados) {
	        $scope.unidades = dados;
	    }).catch(function(error) {
	        MensagemService.tratarErro("Erro ao buscar unidades!", error);
	    });

    // Busca áreas comuns
    ConsultaService.simples("liberacao/areascomuns")
	    .then(function(dados) {
	        $scope.areasComuns = dados;

	        console.log($scope.areasComuns);
	    }).catch(function(error) {
	        MensagemService.tratarErro("Erro ao buscar áreas comuns!", error);
	    });

	// Busca portas de entrada
    ConsultaService.simples("liberacao/portasentrada")
		.then(function(dados) {
	        $scope.portas = dados;
		}).catch(function(error) {
	        MensagemService.tratarErro("Erro ao buscar portas!", error);
		});

	// PESQUISA DO MORADOR
	$scope.inicializarMorador = function() {
		$scope.filterMorador = {};

		$scope.tableParamsMorador = new ngTableParams({
            page: 1, 
            count: 5,
            sorting : { "pessoa.nome" : "asc" },
            defaultSort : "asc"
        }, {
            counts : [],
            total: 0, // length of data
            getData: function ($defer, params) {
                var order = params.sorting();

                var parametrosConsulta = {
                    "filtro" : $scope.filterMorador, 
                    "pageSize" : params.count(), 
                    "pageNumber" : params.page(),
                    "order" : order
                };

                ConsultaService.pesquisar("morador", parametrosConsulta)
                    .then(function(dados) {
                        params.total(dados.total);
                        return $defer.resolve(dados.lista);
                    }).catch(function(erro) {
                        MensagemService.tratarErro("Erro ao buscar registros!", erro);
                    });
                }
    	});
	}
	

    $scope.atualizarMorador = function() {
        $scope.tableParamsMorador.page(1);
        $scope.tableParamsMorador.reload(); 
    }

    $scope.limparPesquisaMorador = function() {
        $scope.filterMorador = {};
        $scope.atualizarMorador();
    }
	// FIM PESQUISA DO MORADOR

	$scope.limpar();
}]);