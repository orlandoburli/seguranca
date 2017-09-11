controllers.controller('SideBarController', ['$scope', '$state', 'MenuProvider', function($scope, $state, MenuProvider){
	
	$scope.menus = MenuProvider.menu;
	
}]);