controllers.controller('UnidadeController', ['$scope', 'GenericController', 'ConsultaService', 'MensagemService', '$location', 'UnidadeService', function($scope, GenericController, ConsultaService, MensagemService, $location, UnidadeService) {
    // Filtro padrao
    $scope.padrao = function() {
        $scope.filter.ativo = "Ativo";  
    }

    $scope.defaultSort = {"numero" : "asc"};

	// Controller genérico
	GenericController.buildController($scope, "cadastros", "unidade");

	// Busca blocos
    ConsultaService.pesquisar("bloco", {
        "filtro" : {
            "ativo" : "Ativo" 
        },
        "order" : { "nome" : "asc" }
    })
    .then(function(dados) {
        $scope.blocos = dados.lista;
    }).catch(function(error) {
        MensagemService.erro("Erro ao buscar registros!", "Mensagem: " + error);
    });

    // Busca torres
    ConsultaService.pesquisar("torre", {
        "filtro" : {
            "ativo" : "Ativo" 
        },
        "order" : { "nome" : "asc" }
    })
    .then(function(dados) {
        $scope.torres = dados.lista;
    }).catch(function(error) {
        MensagemService.erro("Erro ao buscar registros!", "Mensagem: " + error);
    });

    if ($location.path() == "/unidade-multiplos/") {
        $scope.limpar = function(formulario) {
            $scope.vo = {};
            formulario.$setPristine();
        }

        $scope.voltar = function() {
            $location.path("unidade/listar/");
        }

        $scope.form = {
            submit : function(form) {
                var firstError = null;

                if (form.$invalid) {

                    var field = null, firstError = null;
                    for (field in form) {
                        if (field[0] != '$') {
                            if (firstError === null && !form[field].$valid) {
                                firstError = form[field].$name;
                            }

                            if (form[field].$pristine) {
                                form[field].$dirty = true;
                            }
                        }
                    }
                    angular.element('.ng-invalid[name=' + firstError + ']').focus();
                    MensagemService.erro("Existem erros a serem verificados!", "Veja os campos marcados em vermelho!");
                    return;
                } else {
                    // Envia dados
                    UnidadeService.multiplos($scope.vo.torre.id, $scope.vo.bloco.id)
                        .then(function(dados) {
                            MensagemService.sucesso("Registros cadastrados com sucesso!", "Foram cadastrados " +  dados + " registros com sucesso!");
                            $scope.limpar(form);
                        }).catch(function(error) {
                            MensagemService.erro("Erro ao cadastrar múltiplos registros!", "Mensagem: " + error);
                        });
                }
            }
        }
    }

    // Cadastro multiplo
    $scope.multiplos = function() {
        $location.path("unidade-multiplos/");
    }
}]);