// Componentes / Botoes padroes para o sistema
directives.directive('botaoAlterar', [function() {
	return {
		restrict: 'AE',
		template: function($scope, iElm, iAttrs, controller) {			
			var extraClass = "";

			if (iElm.hasOwnProperty("mini")) {
				extraClass = "btn-xs ";
			}

			if (iElm.hasOwnProperty("full")) {
				extraClass = "btn-block ";
			}

			return '<button type="button" class="btn ' + extraClass + 'blue-hoki"><i class="fa fa-edit"></i> Alterar</button>';
		},
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
}]);

directives.directive('botaoExcluir', [function() {
	return {
		restrict: 'AE',
		scope : {
			mini : "@mini"
		},
		template: function($scope, iElm, iAttrs, controller) {
			var extraClass = "";

			if (iElm.hasOwnProperty("mini")) {
				extraClass = "btn-xs ";
			}

			if (iElm.hasOwnProperty("full")) {
				extraClass = "btn-block ";
			}

			return '<button type="button" class="btn ' + extraClass + 'red-thunderbird"><i class="fa fa-trash"></i> Excluir</button>';
		},
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
}]);

directives.directive('botaoNovo', [function() {
	return {
		restrict: 'AE',
		template: function($scope, iElm, iAttrs, controller) {
			var extraClass = "";

			if (iElm.hasOwnProperty("mini")) {
				extraClass = "btn-xs ";
			}

			if (iElm.hasOwnProperty("full")) {
				extraClass = "btn-block ";
			}

			return '<button type="button" class="btn ' + extraClass + 'green-dark"><i class="fa fa-plus"></i> Novo</button>';
		},
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
}]);

directives.directive('botaoSalvar', [function() {
	return {
		restrict: 'AE',
		template: function($scope, iElm, iAttrs, controller) {
			var extraClass = "";

			if (iElm.hasOwnProperty("mini")) {
				extraClass = "btn-xs ";
			}

			if (iElm.hasOwnProperty("full")) {
				extraClass = "btn-block ";
			}

			return '<button type="submit" class="btn ' + extraClass + 'blue-steel"><i class="fa fa-save"></i> Salvar</button>';
		},
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
}]);

directives.directive('botaoVoltar', [function() {
	return {
		restrict: 'AE',

		template: function($scope, iElm, iAttrs, controller) {
			var extraClass = "";

			if (iElm.hasOwnProperty("mini")) {
				extraClass = "btn-xs ";
			}

			if (iElm.hasOwnProperty("full")) {
				extraClass = "btn-block ";
			}

			return '<button type="button" class="btn ' + extraClass + 'grey-gallery"><i class="fa fa-history"></i> Voltar</button>';
		},
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
}]);

directives.directive('botaoLimpar', [function() {
	return {
		restrict: 'AE',

		template: function($scope, iElm, iAttrs, controller) {
			var extraClass = "";

			if (iElm.hasOwnProperty("mini")) {
				extraClass = "btn-xs ";
			}

			if (iElm.hasOwnProperty("full")) {
				extraClass = "btn-block ";
			}

			return '<button type="button" class="btn ' + extraClass + 'blue-madison"><i class="fa fa-trash"></i> Limpar</button>';
		},
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
}]);