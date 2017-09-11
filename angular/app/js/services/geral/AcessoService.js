'use strict';

services.factory('AcessoService', ['$rootScope', '$cookies', function($rootScope, $cookies) {
	var service = {};
	
	service.setUserData = function(dados) {
		$cookies.putObject('sk', dados);
	}
	
	service.userData = function() {
		return $cookies.getObject('sk');
	}
	
	service.logoff = function() {
		$cookies.remove('sk');
	}

	service.isLogado = function() {
		return service.userData();
	}
	
	return service;
}]);