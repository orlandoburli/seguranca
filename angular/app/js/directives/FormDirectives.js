directives.directive('formPesquisa', [function(){
	// Runs during compile
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'js/directives/views/formPesquisa.html',
		replace : true,
		transclude: {
			'filtros' : 'filtros',
			'tabela' : 'tabela',
			'botoes' : 'botoes'
		}
	};
}]);

directives.directive('formCadastro', [function(){
	// Runs during compile
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'js/directives/views/formCadastro.html',
		replace : true,
		transclude: {
			'campos' : 'campos',
			'botoes' : '?botoes'
		}
	};
}]);

directives.directive('row', [function() {
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		replace : true,
		template : '<div class="row" ng-transclude></div>',
		transclude : true
	}
}]);