controllers.controller('PessoaController', ['$scope', 'GenericController', 'ConsultaService', 'MensagemService', 'EstadoService', 'CepService', '$uibModal', function($scope, GenericController, ConsultaService, MensagemService, EstadoService, CepService, $uibModal) {

	// Filtro padrao
    $scope.padrao = function() {
    	$scope.filter.tipoPessoa$morador = "Não";
    }

    var _video = null;
    var patData = null;

    // Setup a channel to receive a video property
    // with a reference to the video element
    // See the HTML binding in main.html
    $scope.myChannel = {};

    $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};

    var getVideoData = function getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };

    var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
        $scope.snapshotData = imgBase64;
    };

    $scope.defaultSort = { "nome" : "asc" };

	// Controller genérico
	GenericController.buildController($scope, "cadastros", "pessoa");

    // WebCam
    if ($scope.isCadastro()) {
        $scope.myChannel = {
            // the fields below are all optional
            videoHeight: 480,
            videoWidth: 568,
            video: null // Will reference the video element on success
        };

        if (!$scope.vo.foto) {
            $scope.vo.foto = "assets/global/img/sem-foto.gif";
        }

        $('#modalCamera').on('shown.bs.modal', function () {
            $scope.tirarNovaFoto();
        });

        // Tira a foto e salva em variavel temporaria
        $scope.tirarFoto = function() {
            $scope.fotoTirada = true;
            // 
            if (_video) {
                // Esconde o snapshot
                // $("#snapshot").show();

                var patCanvas = document.querySelector('#snapshot');
                if (!patCanvas) return;

                patCanvas.width = _video.width;
                patCanvas.height = _video.height;
                var ctxPat = patCanvas.getContext('2d');

                var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
                ctxPat.putImageData(idata, 0, 0);

                sendSnapshotToServer(patCanvas.toDataURL());

                patData = idata;
            }
        }

        // Prepara a camera novamente para tirar a foto
        $scope.tirarNovaFoto = function() {
            $scope.fotoTirada = false;

            var snapCanvas = document.querySelector('#snapshot');

            var context = snapCanvas.getContext('2d');
            context.clearRect(0, 0, snapCanvas.width, snapCanvas.height);
        }

        // Joga a foto selecionada para o vo.
        $scope.usarEstaFoto = function() {
            $scope.vo.foto = $scope.snapshotData;
            $('#modalCamera').modal('hide');
        }

        $scope.webcamError = false;

        $scope.onError = function (err) {
            $scope.$apply(
                function() {
                    $scope.webcamError = err;
                }
            );
        };

        $scope.onSuccess = function () {
            // The video element contains the captured camera data
            _video = $scope.myChannel.video;
            $scope.$apply(function() {
                $scope.patOpts.w = _video.width;
                $scope.patOpts.h = _video.height;
                $scope.showDemos = true;
            });
        };
    }
    
    if ($scope.isInclusao() ) {
        // $scope.vo.morador = "Não"
    }

    // Busca tipos de pessoa (não moradores)
    ConsultaService.pesquisar("tipopessoa", {
        "filtro" : {
            "ativo" : "Ativo",
            "morador" : "Não"
        },
        "order" : { "nome" : "asc" }
    })
    .then(function(dados) {
        $scope.tiposPessoa = dados.lista;
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
        if ($scope.vo.cep) {
            if ($scope.vo.endereco) {
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
        CepService.buscarPorCep($scope.vo.cep)
            .then(function(dados) {
                console.log(dados);
                if (dados.erro) {
                    MensagemService.erro("Atenção!", "CEP " + $scope.vo.cep + " não encontrado. Verifique se o mesmo está digitado corretamente.");
                } else {
                    $scope.vo.endereco = dados.logradouro;
                    $scope.vo.bairro = dados.bairro;
                    $scope.vo.cidade = dados.localidade;
                    $scope.vo.uf = dados.uf;
                }
                
            }).catch(function(error) {
                MensagemService.erro("Erro ao buscar CEP!", "Mensagem: " + error);
            });
    }
}]);