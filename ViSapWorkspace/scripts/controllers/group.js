(function () {
    'use strict';

    angular
        .module('workspace')
        .controller('GroupController', ['$scope', '$rootScope', '$modal', 'services', 'msgService',
            function ($scope, $rootScope, $modal, services, msgService) {
                $scope.ng = sessionStorage.getItem('ng');
                $scope.loginname = sessionStorage.getItem("loginname");
                $scope.userid = sessionStorage.getItem("userid");
                $scope.authToken = sessionStorage.getItem("authT");
                $scope.UserData = null;
                $scope.workSpaceName = sessionStorage.getItem("workSpaceName");
                
                $scope.logout = function () {
                       
                   var ng = sessionStorage.getItem('ng');
                   if(ng === "1") {
                      window.location.href = configData.ngLoginPage;
                   } else {
                      window.location.href = 'index.html';
                   }
                   sessionStorage.clear();
                }
                $scope.loadGroup = function () {

                    var removeTemplate = '<a class="gridText manageusers" src="images/manage-user.png"  ng-i18next="[title]group.manageUsers" alt="Manage User" ng-click="getStudents($event, row.entity)"></a><a class="icn-edit" ng-i18next="[title]common.edit" ng-click="editGroup($event, row.entity)"/></a><a class="icn-delete gridText" ng-i18next="[title]common.delete" ng-click="removeRow($event, row.entity)" /></a>';
                    var workspaceTemplate = '<span class="truncateTxtWorkSpace gridText" ng-attr-title="{{row.entity.name}}">{{row.entity.name}}</span>'

                    $scope.gridOptions = {
                        data: 'grouplist',
                        rowHeight: 35,
                        showSelectionCheckbox: false,
                        multiSelect: false,
                        columnDefs: [{
                            field: 'name',
                            displayName: getlocalizeValue('group.groupName'),
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
                                displayName: getlocalizeValue('common.action'),
                                width: '150px',
                                cellTemplate: removeTemplate
                            }
                        ],
                        sortInfo: {
                            fields: ['name'],
                            directions: ['asc']
                        }
                    };

                    services.GetGroupbyUserID(function (dataResponse) {
                        $rootScope.grouplist = dataResponse;
                    }, $scope.userid);

                };


                $scope.removeRow = function ($event, entity) {

                    var obj = {
                        msg: getlocalizeValue("msg.delete"),
                        id: entity._id,
                        entity: entity
                    };
                    //shows the confirmation modal with callback fn.
                    msgService.confirmation($scope, $modal, obj, $scope.deleteGroup);
                };

                //After confirmation delete group.
                $scope.deleteGroup = function (istrue, obj) {

                    if (istrue) {
                        services.DeleteGroup(obj.id, function (dataResponse) {
                            $rootScope.grouplist.splice($rootScope.grouplist.indexOf(obj.entity), 1);
                        });
                    }
                };
                $scope.SearchGroup = function () {
                    $scope.searchtype = "group";
                    $scope.gridOptions = {
                        data: 'grouplist',
                        showSelectionCheckbox: false,
                        columnDefs: [{
                            field: 'name',
                            displayName: 'Group Name'
                        }]
                    };
                    var dataObj = {
                        name: $.trim($scope.serach),
                        searchfor: $scope.searchtype,
                        userid: $scope.userid
                    };
                    services.GetSearchResults(dataObj, function (dataResponse) {
                        $rootScope.grouplist = dataResponse;
                    });
                };
                //this will execute when user clicks on the access video link	
                $scope.accessVideos = function () {
                    var URLvalue = {
                        visapURL: "visapURL"
                    };
                    services.getAppSettingsValues(URLvalue, function (data) {
                        window.location.href = data.visapURL;

                    });

                };
                // Open up the light box to add new workspace
                $scope.editGroup = function ($event, entity) {
                    if (entity.name === undefined) {
                        return false;
                    }
                    $scope.GroupModalName = getlocalizeValue("group.edit"); //To display modal name.
                    $scope.name = entity.name;
                       $scope.existigName= entity.name;
                    $scope.id = entity._id;
                    $scope.modelinstance = $modal

                        .open({
                            templateUrl: 'views/group.create.html',
                            controller: 'GroupController',
                            size: 'md',
                            backdrop: 'static',
                            keyboard: false,
                            scope: $scope

                        })
                };

                // Open up the light box to add new workspace
                $scope.getStudents = function ($event, entity) {

                    $scope.groupid = entity._id;
                    $scope.modelinstance = $modal

                        .open({
                            templateUrl: 'views/studentlist.html',
                            controller: 'StudentController',
                            size: 'md',
                            backdrop: 'static',
                            keyboard: false,
                            scope: $scope

                        })
                };

                $scope.newGroup = function () {
                    $scope.GroupModalName = getlocalizeValue("group.create"); //To display modal name.
                    $scope.name = '';
                    $scope.id = undefined;
                    $scope.existigName = '';
                    $scope.modelinstance = $modal
                        .open({
                            templateUrl: 'views/group.create.html',
                            controller: 'GroupController',
                            size: 'md',
                            backdrop: 'static',
                            keyboard: false,
                            scope: $scope

                        })
                };

                //closing  the popup
                $scope.closeMyPopup = function () {
                    $scope.modelinstance.close();
                };

                $scope.saveGroup = function () {

                    if ($scope.myForm.$invalid){
                        return false;
                    }    
                   //To check the group name is changed are not in edit mode.          
                    var editMode = (angular.lowercase($scope.existigName) ===  angular.lowercase($scope.name)) ? true : false;  

                    // group creation is based on the user who logged in
                    var dataObj = {
                        name: $scope.name,
                        _id: $scope.id,
                        createduserId: $scope.userid
                    };
                    // now create the group after getting user id
                    services.createGroup(dataObj,editMode, function (response) {
                        //RETURN ERROR CODE AND CHECK INSTAED OF MESSAGE
                        if (response === "false") {
                            var ele = $("#errormessage").show();
                            msgService.showMsg(ele, getlocalizeValue("msg.groupNameExists"));
                        } else {
                            $scope.closeMyPopup();
                            var ele = $("#saveMsg");
                            msgService.saveMsg(ele);
                            $rootScope.grouplist = response;
                        }
                    });
                }
            }
        ]);

})();