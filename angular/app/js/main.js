var app = angular.module("app", [
    "ngResource",
    "ngTable",
    "ngCookies",
    "ui.select",
    "ui.router", 
    "ui.bootstrap", 
    "ui.utils.masks",
    "oc.lazyLoad",  
    "oitozero.ngSweetAlert",
    "ngSanitize",
    "webcam",
    "angular-md5",
    "InnovareSecurity.controllers", 
    "InnovareSecurity.services", 
    "InnovareSecurity.directives", 
    "InnovareSecurity.providers"
]);

var controllers = angular.module('InnovareSecurity.controllers', []);
var services    = angular.module('InnovareSecurity.services', []);
var directives  = angular.module('InnovareSecurity.directives', []);
var providers   = angular.module('InnovareSecurity.providers', []);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
app.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

// Controle de sessão - injeta o atributo de sessao em todas as telas
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);

/* Setup global settings */
app.factory('settings', ['$rootScope', 'AcessoService', '$location', function($rootScope, AcessoService, $location) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout4',
    };

    $rootScope.settings = settings;


    // Validação de usuario autenticado
    $rootScope.$on("$locationChangeStart", function(event, next, current){
        if (!next.endsWith("/acesso")) {
            if (!AcessoService.isLogado()) {
                // Se nao estiver logado, manda para o login
                event.preventDefault();
                $location.path("/acesso");
            }
        }
    });

    return settings;
}]);

/* Setup App Main Controller */
app.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        // Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/* Setup Layout Part - Header */
app.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
app.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Sidebar */
app.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {        
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Quick Sidebar */
app.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
app.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
app.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);

    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        // Minha aplicação
        .state('home', {
            url: "/home",
            data: {pageTitle: 'Home'},
            templateUrl: "views/geral/home.html",
            label: 'Início'
        })
        .state('acesso', {
            url : "/acesso",
            data : { pageTitle : 'Acesso ao sistema'},
            label : 'Acesso',
            templateUrl : "views/geral/login.html",
            controller : "LoginController"
        });
    app.stateProvider = $stateProvider;
}]);

/* Init global settings and run the app */
app.run(["$rootScope", "settings", "$state", "$location", "$interval", "MenuProvider", "LoginService", "MensagemService", function($rootScope, settings, $state, $location, $interval, MenuProvider, LoginService, MensagemService) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view

    var menus = MenuProvider.menu;

    for (var i = menus.length - 1; i >= 0; i--) {
        var menu = menus[i];
        // 
        app.stateProvider.state('app.' + menu.name, {
            url : "/" + menu.name,
            title : menu.title,
            abstract : true,
            parent : "app"
        });

        // Navegacao dos itens
        if (menu.itens) {
            for (var j = menu.itens.length - 1; j >= 0; j--) {
                var item = menu.itens[j];

                if (item.crud) {
                    // Padrao CRUD

                    // Consulta
                    app.stateProvider.state(item.name, {
                        url : "/" + item.name + "/listar/",
                        data: {pageTitle: item.title, parentTitle : menu.title, pageSubTitle : item.subTitle, classIcon : item.classIcon},
                        templateUrl : "/views/" + menu.name +"/" + item.name + "_consulta.html",
                        controller : item.controller
                    });

                    // Cadastro
                    app.stateProvider.state(item.name + "_cadastro", {
                        url : "/" + item.name +"/:acao/:id",
                        data: {pageTitle: item.title, parentTitle : menu.title, pageSubTitle : item.subTitle, classIcon : item.classIcon},
                        templateUrl : "/views/" + menu.name +"/" + item.name + "_cadastro.html",
                        controller : item.controller
                    });
                } else {
                    app.stateProvider.state(item.name, {
                        url : item.url,
                        data: {pageTitle: item.title, parentTitle : menu.title, pageSubTitle : item.subTitle, classIcon : item.classIcon},
                        templateUrl : item.templateUrl,
                        controller : item.controller
                    });
                }
            }
        }
    }

    // Função de "ping" que irá manter a sessão viva
    var pingSessao = function() {
        if (!$location.path().endsWith("/acesso")) {
            LoginService.ping()
                .then(function() {
                    // Tudo OK
                }).catch(function(error) {
                    // Erro - nao ok
                    MensagemService.tratarErro("Erro ao acessar dados", error);

                    // Manda pro login
                    $location.path("/acesso");
                });
        }
    }

    // Liga o timer do "ping" para manter a sessão viva
    $interval(pingSessao, 5000);
    
}]);