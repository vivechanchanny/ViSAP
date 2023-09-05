(function() {
    'use strict';

    angular
        .module('workspace')
        .controller('WorkSpaceController', ['$scope', '$rootScope', '$modal', 'services', 'msgService', '$http', '$log', '$window',
            function($scope, $rootScope, $modal, services, msgService) {

                $scope.workspacename = null;
                $scope.loginname = sessionStorage.getItem("loginname");
                $scope.isVisible = true;

                $scope.workspace = function() {
                    $('#workspace').addClass('active');
                    $('#user').removeClass('active');

                }

                $rootScope.keyPress = function(value) {
                    if (value && typeof value === 'string') {
                        return value.trim().split(/\s+/).length;
                    } else {
                        return 0;
                    }
                };

                $scope.loadWorkspace = function() {
                    var removeTemplate = '<a class="icn-edit" ng-i18next="[title]common.edit"  ng-click="editWorkspace($event, row.entity)"  /></a><a class="icn-delete gridText" ng-i18next="[title]common.delete"  ng-click="removeRow($event, row.entity)" /></a>';
                    var workspaceTemplate = '<span class="truncateTxtWorkSpace gridText" ng-attr-title="{{row.entity.name}}">{{row.entity.name}}</span>'

                    $scope.gridOptions = {
                        data: 'workspaces',
                        showSelectionCheckbox: false,
                       multiSelect : false,

                        columnDefs: [{
                                field: 'name',
                                displayName: getlocalizeValue("workspace.workspaceName"),
                                width: '500px',
                                cellTemplate: workspaceTemplate,
                                sortInfo: true
                            },
                            {
                                field: '_id',
                                displayName: 'id',
                                visible: false
                            },
                            {
                                field: 'remove',
                                displayName: getlocalizeValue("common.action"),
                                cellTemplate: removeTemplate
                            }
                        ],
                        sortInfo: {
                            fields: ['name'],
                            directions: ['asc']
                        }
                    };
                    services.GetAllWorkspaces(function(dataResponse) {
                        $rootScope.workspaces = dataResponse;
                    });

                    $scope.removeRow = function($event, entity) {

                        var obj = {
                            msg: getlocalizeValue("msg.delete"),
                            id: entity._id,
                            entity: entity
                        };
                        //shows the confirmation modal with callback fn.
                        msgService.confirmation($scope, $modal, obj, $scope.deleteWorkspace);
                    };
                };

                //After confirmation delete workspace.
                $scope.deleteWorkspace = function(istrue, obj) {

                    if (istrue) {
                        services.DeleteWorkspace(obj.id, function(dataResponse) {
                            $rootScope.workspaces.splice($rootScope.workspaces.indexOf(obj.entity), 1);
                        });
                    }
                };

                $scope.SearchWorkspace = function() {

                    $scope.gridOptions = {
                        data: 'workspaces',
                        showSelectionCheckbox: false,
                        columnDefs: [{
                            field: 'name',
                            displayName: 'Workspace Name'
                        }]
                    };
                    var dataObj = {
                        name: $.trim($scope.serach)
                    };
                    services.GetSearchResults(dataObj, function(dataResponse) {
                        $rootScope.workspaces = dataResponse;
                    });
                };

                // Open up the light box to add new workspace
                $scope.editWorkspace = function($event, entity) {                   
                    if (entity.name === undefined) {
                        return false;
                    }
                    $scope.workspaceModalName = getlocalizeValue("workspace.edit");
                    $scope.name = entity.name;
                    $scope.existigName= entity.name;
                    $scope.id = entity._id;
                    $scope.modelinstance = $modal

                        .open({
                            templateUrl: 'views/workspace.create.html',
                            controller: 'WorkSpaceController',
                            size: 'md',
                            backdrop: 'static',
                            keyboard: false,
                            scope: $scope

                        })
                };

                $scope.newWorkspace = function() {
                    $scope.workspaceModalName = getlocalizeValue("workspace.create");
                    $scope.name = '';
                    $scope.id = undefined;
                    $scope.existigName='';//clear previous text.
                    $scope.modelinstance = $modal
                        .open({
                            templateUrl: 'views/workspace.create.html',
                            controller: 'WorkSpaceController',
                            size: 'md',
                            backdrop: 'static',
                            keyboard: false,
                            scope: $scope
                        })
                };

                //closing  the popup
                $scope.closeMyPopup = function() {
                    $scope.modelinstance.close();
                };

                $scope.saveWorkSpace = function() {
                    if ($scope.myForm.$invalid) {
                        return false;
                    }
                    //To check the workspace name is changed are not in edit mode.                   
                    var editMode = (angular.lowercase($scope.existigName) ===  angular.lowercase($scope.name)) ? true : false;                  
                  
                    var dataObj = {
                        name: $scope.name,
                        _id: $scope.id
                    };
                   
                    services.createWorkSpace(dataObj,editMode, function(response) {
                        
                        if (response != null) {
                            if (response === "false") {
                                var ele = $("#errormessage").show();
                                msgService.showMsg(ele, getlocalizeValue("msg.workspaceNameExists"));
                            } else {
                                $scope.closeMyPopup();
                                var ele = $("#saveMsg");
                                msgService.saveMsg(ele); //pop up message will display once workspace created successfully.
                                $rootScope.workspaces = response;
                            }
                        } else {
                            var ele = $("#errormessage").show();
                            msgService.showMsg(ele, getlocalizeValue("msg.failed"));
                        }
                    });
                }

            }
        ]);

})();