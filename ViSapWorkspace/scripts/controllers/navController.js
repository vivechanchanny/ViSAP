(function () {
    'use strict';
    //This is to get the workspacename from rootscope to local scope and to clear the sessionStorage when user logout the application.
    angular.module('workspace').controller('navController',['$scope','$rootScope',
            function($scope, $rootScope) {
         
                $scope.workSpaceName = $rootScope.workSpaceName;
                
                //To hide workspace name based on role.
                $rootScope.hideworkSpaceName=function()
                {
				            $rootScope.issuperAdmin=true;
				            if(sessionStorage.getItem('Role')==="1") $rootScope.issuperAdmin=false;
		                    else $rootScope.issuperAdmin=true;
		        }
              
                    $scope.logout=function()
                    {
                       window.location.href = 'index.html';
                       sessionStorage.clear();
                    }
            }]);


})();