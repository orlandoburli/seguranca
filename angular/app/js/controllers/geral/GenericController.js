 'use strict';

services.factory('GenericController', ['ngTableParams', '$stateParams', '$location', 'CadastroService', 'ConsultaService', 'MensagemService',
    function(ngTableParams, $stateParams, $location, CadastroService, ConsultaService, MensagemService) {
    return {
        buildController : function($scope, modulo, entidade) {

            $scope.acao = $stateParams.acao;
            $scope.vo = {};

            $scope.isAlteracao = function() {
                return $stateParams.acao == "alterar";
            }

            $scope.isExclusao = function() {
                return $stateParams.acao == "excluir";
            }

            $scope.isInclusao = function() {
                return $stateParams.acao == "incluir";
            }

            $scope.isCadastro = function() {
                return $scope.isInclusao() || $scope.isAlteracao();
            }

            $scope.isConsulta = function() {
                return $stateParams.acao == "listar" || $stateParams.acao == "" || $stateParams.acao == null;
            }

            // Objetos / coleções padrão
            // Ativo / Inativo
            $scope.ativos = ["Ativo", "Inativo"];

            // Sim / Não
            $scope.simNao = ["Sim", "Não"];

            if ($scope.isConsulta()) {
                // Controller de consulta
                $scope.filter = {};

                // Filtro padrao setado aqui.
                if ($scope.padrao) {
                    $scope.padrao();    
                }

                $scope.tableParams = new ngTableParams({
                        page: 1, 
                        count: 5,
                        sorting : $scope.defaultSort,
                        defaultSort : "asc"
                    }, {
                        counts : [],
                        total: 0, // length of data
                        getData: function ($defer, params) {
                            var order = params.sorting();

                            var parametrosConsulta = {
                                "filtro" : $scope.filter, 
                                "pageSize" : params.count(), 
                                "pageNumber" : params.page(),
                                "order" : order
                            };

                            ConsultaService.pesquisar(entidade, parametrosConsulta)
                                .then(function(dados) {
                                    params.total(dados.total);
                                    return $defer.resolve(dados.lista);
                                }).catch(function(erro) {
                                    MensagemService.tratarErro("Erro ao buscar registros!", erro);
                                });
                            }
                });

                $scope.atualizar = function() {
                    $scope.tableParams.page(1);
                    $scope.tableParams.reload(); 
                }

                $scope.limpar = function() {
                    $scope.filter = {};

                    // Filtro padrao setado aqui.
                    if ($scope.padrao) {
                        $scope.padrao();    
                    }

                    $scope.atualizar();
                }

                $scope.excluir = function(id) {
                    $location.path(entidade +"/excluir/" + id);
                }

                $scope.alterar = function(id) {
                    $location.path(entidade +"/alterar/" + id);
                }

                $scope.novo = function() {
                    $location.path(entidade +"/incluir/");
                }
            } else {                
                $scope.disabled = !($scope.isInclusao() || $scope.isAlteracao());
                
                // Controller de cadastro
                if ($scope.isAlteracao() || $scope.isExclusao()) {
                    CadastroService.resource(entidade).get({id : $stateParams.id}, function(vo) {
                        $scope.vo = vo;
                    }, function(erro) {
                        console.log(erro);
                        MensagemService.tratarErro("Erro ao buscar registro!", erro);
                    });
                }

                $scope.voltar = function() {
                    $location.path(entidade +"/listar/");
                }

                $scope.excluir = function() {
                    MensagemService.confirmacao("Confirmação de exclusão", "Confirma a exclusão deste registro?", function() {
                        // Sim
                        CadastroService.resource(entidade).delete(
                        {id : $scope.vo.id },
                        function(retorno) {
                            // Sucesso
                            $scope.vo = retorno;
                            MensagemService.sucesso("Registro excluído com sucesso!", "O seu registro foi excluído com sucesso!");
                            $scope.voltar();
                        }, function(erro) {
                            console.log(erro);
                            MensagemService.tratarErro("Erro ao excluir registro!", erro);
                        });
                    });
                };

                $scope.form = {
                    submit: function (form) {
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
                            if ($scope.vo.id) {
                                // Update
                                CadastroService.resource(entidade).update(null, $scope.vo, function(retorno) {
                                    // Sucesso
                                    $scope.vo = retorno;

                                    MensagemService.sucesso("Registro alterado com sucesso!", "O seu registro foi alterado com sucesso!");
                                    $scope.voltar();
                                }, function(erro) {
                                    // Erro
                                    console.log(erro);
                                    MensagemService.tratarErro("Erro ao alterar registro!", erro);
                                });
                            } else {
                                // Inserção
                                CadastroService.resource(entidade).save($scope.vo, function(retorno) {
                                    // Sucesso
                                    $scope.vo = retorno;
                                    MensagemService.sucesso("Registro inserido com sucesso!", "O seu registro foi inserido com sucesso!");
                                    $scope.voltar();
                                }, function(erro) {
                                    // Erro
                                    console.log(erro);
                                    MensagemService.tratarErro("Erro ao inserir registro!", erro);
                                });
                            }
                        }
                    }
                };
            }
        }
    }
}]);