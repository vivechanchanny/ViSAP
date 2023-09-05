(function() {
    'use strict';

    angular
        .module('workspace', ['ngRoute', 'ui.bootstrap', 'ngGrid', 'ngCookies', 'jm.i18next', 'ngSanitize'])
        .config(config).config(['$httpProvider', function($httpProvider) {
            //$httpProvider is injecting to set the headers value.     
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache'; //This will not cache the headers information during ajax call in angularjs.
        }]).run(run);

    run.$inject = ['$rootScope'];

    function run($rootScope) {
        if (sessionStorage.getItem("workSpaceName") != null)
            $rootScope.workSpaceName = sessionStorage.getItem("workSpaceName");
        $rootScope.grouplist = [];
        $rootScope.Users = [];
        $rootScope.workspaces = [];
    }


    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'LoginController',
                templateUrl: 'views/login.html',
                // controllerAs: 'ws'
            })
            .when('/workspace', {
                controller: 'WorkSpaceController',
                templateUrl: 'views/workspace.view.html',
                controllerAs: 'ws'
            })

            .when('/search', {
                controller: 'WorkSpaceController',
                templateUrl: 'views/searchworkspace.html',
                controllerAs: 'ws'
            })

            .when('/users', {
                controller: 'UserController',
                templateUrl: 'views/user.view.html',
                controllerAs: 'ws'
            })

            .when('/group', {
                controller: 'GroupController',
                templateUrl: 'views/group.view.html',
                controllerAs: 'ws'
            })
            
            .when('/forgotpassword', {
                controller: 'LoginController',
                templateUrl: 'views/forgot.password.html',
                controllerAs: 'ws'
            })
            
            .when('/resetPassword', {
                controller: 'LoginController',
                templateUrl: 'views/resetPassword.html',
                controllerAs: 'ws'
            })

            .otherwise({
                redirectTo: 'login.html'
            });
    }

})();