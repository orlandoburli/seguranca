directives.directive('inputConsulta', ['$timeout', function($timeout){
	return {
		scope: {
			label : "@",
			placeholder : "@",
			focusOnShow : "@",
			filterModel : "=",
			filterChange : "&",
			class : "@"
		},
		restrict: 'E',
		replace : true,
		template: function(iElm, iAttrs) {

			var html = '<div class="form-group">\n';
			html += '	<label class="control-label" for="{{attrName}}">{{label}}</label>\n';
			html += '	<input id="{{attrName}}" name="{{attrName}}" type="text" focus-on-show class="form-control" ng-model="filterModel" ng-change="updateModel()" placeholder="{{placeholder}}" ng-model-options="{ debounce : 250}">\n';
			html += '</div>';
			return html;
		},
		link: function(scope, item, iAttrs, controller) {
			scope.attrName = iAttrs.filterModel;
			scope.updateModel = function() {
				scope.ngModel = scope.filterModel;
				$timeout(scope.filterChange, 0);
			}
		}
	};
}]);

directives.directive('selectConsulta', ['$timeout', function($timeout){
	return {
		scope: {
			label : "@",
			placeholder : "@",
			focusOnShow : "@",
			filterModel : "=",
			filterChange : "&",
			values : "=",
			fieldId : "@",
			fieldLabel : "@",
			todos : "@todos",
			simple : "@",
			empty : "@empty"
		},
		replace : true,
		restrict: 'E',
		template: function(iElm, iAttrs) {

			if (!iAttrs.fieldId) {
				iAttrs.fieldId = "id";
			}

			if (!iAttrs.fieldLabel) {
				iAttrs.fieldLabel = "nome";
			}

			var html = '<div class="form-group">\n';
			html += '	<label class="control-label" for="{{attrName}}">{{label}}</label>\n';
			html += '	<select id="{{attrName}}" name="{{attrName}}" class="form-control" ';
			html += 'name="{{attrName}}" ng-model="filterModel" ng-change="updateModel()">\n';
			
			if (iAttrs.hasOwnProperty("todos")) {
				html += '		<option value="">TODOS</option>\n';
			}

			if (iAttrs.hasOwnProperty("myOptions")) {
				html += ' ng-options="' + iAttrs.myOptions + '">\n';
			} else {
				html += '>\n';
			}
			
			if (iAttrs.hasOwnProperty("empty")) {
				html += '		<option value="">{{empty}}</option>';
			}

			if (iAttrs.hasOwnProperty("values") && (!iAttrs.hasOwnProperty("myOptions"))) {
				
				if (iAttrs.hasOwnProperty("simple")) {
					// Simple - significa array sem id's e label's
					html += '		<option ng-repeat="item in values" value="{{item}}">{{item}}</option>\n';
				} else {
					// tem um id e um label
					html += '		<option ng-repeat="item in values" value="{{item.'+iAttrs.fieldId+'}}">{{item.'+iAttrs.fieldLabel+'}}</option>\n';
				}
			}

			html += '	</select>\n';
			html += '</div>\n';

			return html;
		},
		link: function(scope, item, iAttrs, controller) {
			scope.attrName = iAttrs.filterModel;
			scope.updateModel = function() {
				scope.ngModel = scope.filterModel;
				$timeout(scope.filterChange, 0);
			}
		}
	};
}]);

directives.directive('inputCadastro', ['$timeout', function($timeout){
	return {
		require : '^form',
		scope: {
			label : "@",
			placeholder : "@",
			focusOnShow : "@",
			fieldModel : "=",
			ngDisabled : "=",
			ngBlur : "=",
			fieldChange : "&",
			class : "@",
			required : "@",
			password : "@",
			email : "@",
			number : "@",
			ngMaxlength : "=",
			ngMinlength : "=",

			// Atributos de botao embutido
			btnClass : "@",
			btnIconClass : "@",
			btnClick : "&"
		},
		replace : true,
		restrict: 'E',
		template: function(iElm, iAttrs) {

			var html = '';

			var fieldName = iAttrs.fieldModel.replaceAll(".", "_");

			var type = "text";

			if (iAttrs.hasOwnProperty("password")) {
				type = "password";
			} else if (iAttrs.hasOwnProperty("email")) {
				type = "email";
			} else if (iAttrs.hasOwnProperty("number")) {
				type = "number";
			} else if (iAttrs.hasOwnProperty("phone")) {
				type = "tel";
			}

			html += '<div class="form-group" ng-class="{\'has-error\':formulario.' + fieldName + '.$dirty && formulario.' + fieldName + '.$invalid, \'has-successx	\':formulario.' + fieldName + '.$valid}">\n' ;
			html += '    <label for="' + fieldName + '" class="control-label">\n';
			html += '        ' + iAttrs.label + '\n';
			html += '    </label>\n';

			if (iAttrs.hasOwnProperty("btnClass")) {
				html += '<div class="input-group">\n';
				html += '<span class="input-group-btn">\n';
	            html += '    <button class="btn ' + iAttrs.btnClass + '" type="button" ng-click="btnClick()"><i class="' + iAttrs.btnIconClass + '"></i></button>\n';
	            html += '</span>';
	        }

	        if (!iAttrs.hasOwnProperty("textarea")) {
	        	html += '	<input type="' + type + '" class="form-control" id="' + fieldName + '" name="' + fieldName + '" placeholder="' + iAttrs.placeholder +  '" ng-model="fieldModel" ' + (iAttrs.hasOwnProperty("required")?'required ' : ' ');	
	        } else {
	        	html += '	<textarea class="form-control" id="' + fieldName + '" name="' + fieldName + '" placeholder="' + iAttrs.placeholder +  '" ng-model="fieldModel" ' + (iAttrs.hasOwnProperty("required")?'required ' : ' ');
	        }
			
			
			if (iAttrs.hasOwnProperty("ngMaxlength")) {
				html += 'ng-maxlength="' + iAttrs.ngMaxlength + '" ';
			}

			if (iAttrs.hasOwnProperty("phone")) {
				html += ' ui-br-phone-number ';
			}

			if (iAttrs.hasOwnProperty("car")) {
				html += ' ui-br-car-plate-mask ';
			}

			if (iAttrs.hasOwnProperty("cep")) {
				html += ' ui-br-cep-mask ';
			}

			if (iAttrs.hasOwnProperty("cpf")) {
				html += ' ui-br-cpf-mask ';
			}

			if (iAttrs.hasOwnProperty("ngMinlength")) {
				html += 'ng-minlength="' + iAttrs.ngMinlength + '" ';
			}

			if (iAttrs.hasOwnProperty("ngBlur")) {
				html += 'ng-blur="ngBlur" ';	
			}

			if (iAttrs.hasOwnProperty("rows") && iAttrs.hasOwnProperty("textarea")) {
				html += ' rows="' + iAttrs.rows + '"';
			}
			
			html += 'ng-disabled="ngDisabled" >\n';

			if (iAttrs.hasOwnProperty("textarea")) {
				html += '</textarea>\n';
			}

			if (iAttrs.hasOwnProperty("btnClass")) {
				html += '</div>\n';
			}
			
			if (iAttrs.hasOwnProperty("ngMaxlength")) {
				html += '	<span class="font-red text-small block" ng-show="formulario.$submitted && formulario.' + fieldName + '.$error.maxlength">Campo "' + iAttrs.label + '" Deve ter no máximo ' + iAttrs.ngMaxlength + ' caracteres!</span>\n';
			}

			if (iAttrs.hasOwnProperty("ngMinlength")) {
				html += '	<span class="font-red text-small block" ng-show="formulario.$submitted && formulario.' + fieldName + '.$error.minlength">Campo "' + iAttrs.label + '" Deve ter no mínimo ' + iAttrs.ngMinlength + ' caracteres!</span>\n';
			}

			if (iAttrs.hasOwnProperty("required")) {
				html += '	<span class="font-red text-small block" ng-show="formulario.$submitted && formulario.' + fieldName + '.$error.required">Campo ' + iAttrs.label + ' é obrigatório!</span>\n';	
			}

			if (iAttrs.hasOwnProperty("cep")) {
				html += '	<span class="font-red text-small block" ng-show="formulario.$submitted && formulario.' + fieldName + '.$error.cep">Campo ' + iAttrs.label + ' é um CEP inválido!</span>\n';	
			}

			if (type == "number") {
				html += '	<span class="font-red text-small block" ng-show="formulario.$submitted && formulario.' + fieldName + '.$error.number">Número inválido!</span>\n';	
			}
			
			html += '</div>\n';

			return html;
		},
		link: function(scope, item, iAttrs, controller) {
			scope.formulario = controller;

			scope.attrName = iAttrs.fieldModel;

			scope.updateModel = function() {
				scope.ngModel = scope.fieldModel;
				$timeout(scope.fieldChange, 0);
			}
		}
	};
}]);


directives.directive('selectCadastroX', ['$timeout', function($timeout){
	return {
		require : '^form',
		scope: {
			label : "@",
			placeholder : "@",
			focusOnShow : "@",
			fieldModel : "=",
			fieldChange : "&",
			ngDisabled : "=",
			itens : "=",
			required : "@",
			class : "@",
			values : "=",
			fieldId : "@",
			fieldLabel : "@",
			small: "@",
			simple : "@",
			empty : "@empty"
		},
		restrict: 'E',
		replace : true,
		template: function(iElm, iAttrs) {

			if (!iAttrs.fieldId) {
				iAttrs.fieldId = "id";
			}

			if (!iAttrs.fieldLabel) {
				iAttrs.fieldLabel = "nome";
			}

			var fieldName = iAttrs.fieldModel.replaceAll(".", "_");

			var html ='<div class="form-group" ng-class="{\'has-error\':formulario.' + fieldName + '.$dirty && formulario.' + fieldName + '.$invalid, \'has-successx\':formulario.' + fieldName + '.$valid}">\n';
			html += '	<label class="control-label" for="' + fieldName + '">{{label}}</label>\n';
			
			html += '	<ui-select id="' + fieldName + '" name="' + fieldName + '" class=""';

			html += ' ng-model="fieldModel" ng-change="updateModel(fieldModel)" ng-disabled="ngDisabled" ' + (iAttrs.hasOwnProperty("required")?'required ' : ' ');
			
			html += '>\n';
			
			if (iAttrs.hasOwnProperty("empty")) {
				// TODO nao sei como funciona aqui...
				///html += '		<option value="">{{empty}}</option>';
			}

			if (iAttrs.hasOwnProperty("itens")) {
				// tem um id e um label
				//html += '		<option ng-repeat="item in values" value="{{item.' + iAttrs.fieldId + '}}">{{item.'+iAttrs.fieldLabel+'}}</option>\n';
				html += '		<ui-select-match placeholder="' + iAttrs.placeholder + '">{{$select.selected.' + iAttrs.fieldName + '}}</ui-select-match>\n';
				html += '		<ui-select-choices repeat="item in itens | filter: $select.search">\n';
				html += '			<div ng-bind-html="item.' + iAttrs.fieldName + ' | highlight: $select.search"></div>\n';
				html += '				<small>\n';
				html += '					' + iAttrs.small + '\n';
				html += '				</small>\n';
				html += '		</ui-select-choices>\n';
			} else if (iAttrs.hasOwnProperty("simple")) {
				// Simple - significa array sem id's e label's
				// html += '		<option ng-repeat="item in values" value="{{item}}">{{item}}</option>\n';
				html += '	<ui-select-match placeholder="' + iAttrs.placeholder + '">{{$select.selected}}</ui-select-match>';
				html += '	<ui-select-choices repeat="item in values | filter: $select.search">\n';
				html += '		<div ng-bind-html="item | highlight: $select.search"></div>\n';
				html += '	</ui-select-choices>\n';
			}

			html += '	</ui-select>\n';

			if (iAttrs.hasOwnProperty("required")) {
				html += '	<span class="font-red text-small block" ng-show="formulario.$submitted && formulario.' + fieldName + '.$error.required">Campo ' + iAttrs.label + ' é obrigatório!</span>\n';	
			}

			html += '</div>\n';

			return html;
		},
		link: function(scope, item, iAttrs, controller) {
			scope.formulario = controller;
			scope.attrName = iAttrs.fieldName;

			scope.updateModel = function(newValue) {
				scope.fieldModel = newValue;

				if (scope.fieldChange) {
					$timeout(scope.fieldChange(scope.fieldModel), 0);	
				}
			}
		}
	};
}]);


directives.directive('selectCadastro', ['$timeout', function($timeout){
	return {
		require : '^form',
		scope: {
			label : "@",
			focusOnShow : "@",
			fieldModel : "=",
			fieldChange : "&",
			ngDisabled : "=",
			myOptions : "@",
			required : "@",
			class : "@",
			values : "=",
			fieldId : "@",
			fieldLabel : "@",
			simple : "@",
			empty : "@empty"
		},
		restrict: 'E',
		replace : true,
		template: function(iElm, iAttrs) {

			if (!iAttrs.fieldId) {
				iAttrs.fieldId = "id";
			}

			if (!iAttrs.fieldLabel) {
				iAttrs.fieldLabel = "nome";
			}

			var fieldName = iAttrs.fieldModel.replaceAll(".", "_");

			var html ='<div class="form-group" ng-class="{\'has-error\':formulario.' + fieldName + '.$dirty && formulario.' + fieldName + '.$invalid, \'has-successx\':formulario.' + fieldName + '.$valid}">';
			html += '	<label class="control-label" for="' + fieldName + '">{{label}}</label>\n';
			html += '	<select id="' + fieldName + '" name="' + fieldName + '" class="form-control"';
			html += ' ng-model="fieldModel" ng-change="updateModel()" ng-disabled="ngDisabled" ' + (iAttrs.hasOwnProperty("required")?'required ' : ' ');
			
			if (iAttrs.hasOwnProperty("myOptions")) {
				html += ' ng-options="' + iAttrs.myOptions + '">\n';
			} else {
				html += '>\n';
			}
			
			if (iAttrs.hasOwnProperty("empty")) {
				html += '		<option value="">{{empty}}</option>';
			}

			if (iAttrs.hasOwnProperty("values") && (!iAttrs.hasOwnProperty("myOptions"))) {
				
				if (iAttrs.hasOwnProperty("simple")) {
					// Simple - significa array sem id's e label's
					html += '		<option ng-repeat="item in values" value="{{item}}">{{item}}</option>\n';
				} else {
					// tem um id e um label
					html += '		<option ng-repeat="item in values" value="{{item.' + iAttrs.fieldId + '}}">{{item.'+iAttrs.fieldLabel+'}}</option>\n';
				}
			}

			html += '	</select>\n';

			if (iAttrs.hasOwnProperty("required")) {
				html += '	<span class="font-red text-small block" ng-show="formulario.$submitted && formulario.' + fieldName + '.$error.required">Campo ' + iAttrs.label + ' é obrigatório!</span>\n';	
			}

			html += '</div>\n';

			return html;
		},
		link: function(scope, item, iAttrs, controller) {

			scope.formulario = controller;

			scope.attrName = iAttrs.fieldName;

			scope.updateModel = function() {
				scope.ngModel = scope.fieldModel;
				if (scope.fieldChange) {
					$timeout(scope.fieldChange, 0);	
				}
			}
		}
	};
}]);