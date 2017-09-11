app.controller('LoginController', ['$scope', '$rootScope', '$location', '$interval', '$timeout', 'LoginService', 'MensagemService', 'AcessoService', function($scope, $rootScope, $location, $interval, $timeout, LoginService, MensagemService, AcessoService){
	
	// Ao entrar na tela, faz logoff
	AcessoService.logoff();

	var promisseInterval = null;

	$.backstretch([
        "../assets/pages/media/bg/1.jpg",
        "../assets/pages/media/bg/2.jpg",
        "../assets/pages/media/bg/3.jpg",
        "../assets/pages/media/bg/4.jpg"
        ], {
          fade: 1000,
          duration: 2000
    	}
	);

	$rootScope.isLogin = true;

	$timeout(function() {
		$("#usuario").focus();
	}, 1000);

	$("#usuario").on("keydown", function(event) {
		if (event.which == 13) {
			$("#senha").focus();
		}
	});

	$("#senha").on("keydown", function(event) {
		if (event.which == 13) {
			$("#botaoEntrar").focus();
		}
	});

	$scope.entrar = function() {
		LoginService.acesso($scope.usuario, $scope.senha)
			.then(function(dados) {
				// Sucesso

				// Para o background animado
				$.backstretch("destroy", false);

				// Seta os dados na sessao
				AcessoService.setUserData(dados);

				$rootScope.isLogin = false;

				$location.path("/home");
			}).catch(function(erro) {

    			MensagemService.tratarErro("Erro no login!", erro);

                $("#usuario").focus();
			});
	}
}]);