services.factory('sessionInjector', ['AcessoService', '$location', function(AcessoService, $location) {
    var sessionInjector = {
        request: function(config) {
            if (AcessoService.isLogado()) {
                config.headers['AUTHENTICATION_TOKEN'] = AcessoService.userData().token;
            }
            return config;
        },
        response : function(response) {
        	// 
        	// console.log(response);

        	if (response.status == 401) {
        		// Acesso nao autorizado
        		AcessoService.logoff();
        		$location.go("/acesso");
        	}

        	return response;
        }
    };
    return sessionInjector;
}]);