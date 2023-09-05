(function() {
    'use strict';

    angular.module('workspace')
        .controller('UserController', ['$scope', '$rootScope', '$modal', 'services', 'msgService',
            function($scope, $rootScope, $modal, services, msgService) {

                if (sessionStorage.getItem("Role") === "2")
                    $scope.isVisible = false;
                else $scope.isVisible = true;
                $scope.workspaces = [];
                $scope.loginname = sessionStorage.getItem("loginname");

                $scope.user = function() {
                    $('#workspace').removeClass('active');
                    $('#user').addClass('active');
                }
                
                //creation of user
                $scope.createUser = function() {
                    $scope.workspacename = "";
                    $scope.UserModalName = getlocalizeValue('user.create'); //To display modal name.	
                    if (sessionStorage.getItem("Role") === "2") // 2 is for admin
                        $scope.workspacename = sessionStorage.getItem("workSpaceName");
                    $scope.loginNameReadOnly = false; //To enable login name textbox. 
                    $scope.role = getlocalizeValue("user.selectRoleDropdown");
                    $scope.firstname = "";
                    $scope.lastname = "";
                    $scope.Userloginname = "";
                    $scope.password = "";
                    $scope.email = "",
                        $scope.id = undefined;
                    $modal.open({
                        templateUrl: 'views/user.create.html',
                        controller: 'UserController',
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope
                    })
                }

                //Getting workspace Id by workspace name.
                $scope.getwrkspaceId = function(workspaceName) {
                    for (var i = 0; i < $scope.workspaces.length; i++) {
                        if (workspaceName === $scope.workspaces[i].nameValue) {
                            return $scope.workspaces[i]._id;
                        }
                    }
                };

                $scope.getroleId = function(rolename) {
                    for (var i = 0; i < $scope.Roles.length; i++) {
                        if (rolename === $scope.Roles[i].rolename) {
                            return $scope.Roles[i]._id;
                        }
                    }
                };

                services.GetAllWorkspaces(function(response) {

                    $scope.workspaces = response;
                    var maxLength = 80
                    for (var i = 0; i < $scope.workspaces.length; i++) {
                        if ($scope.workspaces[i].name.length > maxLength) {
                            $scope.workspaces[i].nameValue = $scope.workspaces[i].name.substr(0, maxLength) + '...';
                        } else {
                            $scope.workspaces[i].nameValue = $scope.workspaces[i].name;
                        }
                    }
                });

               

                function getRoles(excludeAdmin) {
                    //To load roles for dropdown list 
                    services.GetAllRoles(function(response) {
                        $scope.Roles = response;
                    }, excludeAdmin);
                };
                //Loading all the users and display it in grid           
                $scope.loadUser = function() {
                       
                    //To list the users based on admin role
                    if (sessionStorage.getItem("Role") === "2") {
                        $scope.isShow = false;// This variable is to hide and show the workspace dropdown 
                        $("#gridTableUser").addClass("gridtableAdmin");
                        //to get all the users based on the workspace id
                        var excludeAdmin = "true";
	                
                        services.getUserbyworkspaceId(function(dataResponse) {
                           //This response contains all the users of the same workspace
                           $rootScope.Users = dataResponse;
                        },
	                
                        sessionStorage.getItem("userid"), excludeAdmin);
                        getRoles(excludeAdmin);
                    } else {
                        $scope.isShow = true; 
                        $("#gridTableUser").addClass("gridtableUser");
                        getRoles("false"); //Sending false to get all the roles.
                       
                        services.GetAllUsers(function(dataResponse) {
                         //This response contains all the users(all workspaces).
                            $rootScope.Users = dataResponse;
                        });
                    }

                    var removeTemplate =
                        '<a  class="icn-edit" ng-i18next="[title]common.edit" ng-click="editUser($event, row.entity)"/></a><a class="icn-delete gridText" ng-i18next="[title]common.delete" ng-click="removeRow($event, row.entity)" /></a>';
                    var workspaceTemplate = '<span class="truncateTxtUser gridText"    ng-attr-title="{{row.entity.workspaceId}}">{{row.entity.workspaceId}}</span>';
                    var fnameTemplate = '<div class="truncateTxtUser gridText" ng-attr-title="{{COL_FIELD}}">{{COL_FIELD}}</div>';
                    var lnameTemplate = '<div class="truncateTxtUser gridText" ng-attr-title="{{COL_FIELD}}">{{COL_FIELD}}</div>';
                    var loginNameTemplate = '<div class="truncateTxtUser gridText" ng-attr-title="{{COL_FIELD}}">{{COL_FIELD}}</div>';
                    var emailTemplate = '<div class="truncateTxtUser gridText" ng-attr-title="{{COL_FIELD}}">{{COL_FIELD}}</div>';
                    var roleTemplate = '<div class="gridText" ng-attr-title="{{COL_FIELD}}">{{COL_FIELD}}</div>';
                    //Display all the users in grid
                    $scope.gridOptions = {
                        data: 'Users',
                        showSelectionCheckbox: false,
                        enableCellEditOnFocus: false,
                      multiSelect : false,
                        columnDefs: [{
                                field: 'firstname',
                                displayName: getlocalizeValue("user.firstName"),
                                width: '150px',
                                cellTemplate: fnameTemplate
                            },
                            {
                                field: 'lastname',
                                displayName: getlocalizeValue("user.lastName"),
                                width: '150px',
                                cellTemplate: lnameTemplate
                            },
                            {
                                field: 'loginname',
                                displayName: getlocalizeValue("user.loginName"),
                                width: '150px',
                                cellTemplate: loginNameTemplate
                            },
                            {
                                field: 'email',
                                displayName: getlocalizeValue("user.email"),
                                width: '150px',
                                cellTemplate: emailTemplate
                            },
                            {
                                field: 'workspacename',
                                displayName: getlocalizeValue("user.workspace"),
                                width: '150px',
                                cellTemplate: workspaceTemplate,
                                visible: $scope.isShow
                            },
                            {
                                field: 'role',
                                displayName: getlocalizeValue("user.role"),
                                width: '100px',
                                cellTemplate: roleTemplate
                            },
                            {
                                field: 'remove',
                                displayName: getlocalizeValue("common.action"),
                                width: '145px',
                                cellTemplate: removeTemplate
                            }
                        ]
                    };
                };

                //Delete user
                $scope.removeRow = function($event, entity) {

                    var obj = {
                        msg: getlocalizeValue("msg.delete"),
                        id: entity._id,
                        entity: entity
                    };
                    //shows the confirmation modal with callback fn.
                    msgService.confirmation($scope, $modal, obj, $scope.deleteUser);
                };

                //After confirmation delete user.
                $scope.deleteUser = function(istrue, obj) {

                    if (istrue) {
                        services.DeleteUser(obj.id, function(dataResponse) {
                            $rootScope.Users.splice($rootScope.Users.indexOf(obj.entity), 1);
                        });
                    }
                };

                //Search User
                $scope.SearchUser = function() {
                    $scope.serachtype = "users";
                    var wsId;
                    $scope.gridOptions = {
                        data: 'Users',
                        showSelectionCheckbox: false,
                        columnDefs: [{
                                field: 'firstname',
                                displayName: 'FirstName'
                            },
                            {
                                field: 'lastname',
                                displayName: 'LastName'
                            },

                            {
                                field: 'email',
                                displayName: 'Email'
                            },
                            {
                                field: 'workspacename',
                                displayName: 'Workspace'
                            }
                        ]
                    };

                    var dataObj = {
                        name: $.trim($scope.serach),
                        searchfor: $scope.serachtype
                    };

                    if (sessionStorage.getItem("Role") === "2")
                        wsId = sessionStorage.getItem("workspaceid");


                    services.GetSearchResults(dataObj, function(dataResponse) {
                        $rootScope.Users = dataResponse;
                    }, wsId);
                };

                // Open up the light box to edit user with values.
                $scope.editUser = function($event, entity) {

                    $scope.firstname = entity.firstname;
                    $scope.lastname = entity.lastname;
                    $scope.Userloginname = entity.loginname;
                    $scope.UserloginnameTemp = entity.loginname;
                    $scope.password = entity.password;
                    $scope.email = entity.email;
                    $scope.id = entity._id;
                    $scope.wrk = entity.workspaceId;
                    $scope.workspacename = entity.workspaceId;
                    $scope.role = entity.role;
                    $scope.loginNameReadOnly = true; //To disable login name textbox.
                    $scope.UserModalName = 'Edit User'; //To display modal name.								        
                    $modal.open({
                        templateUrl: 'views/user.create.html',
                        controller: 'UserController',
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope
                    })
                };

                //to know the dropdown value changed or not.
                $scope.selectedDropdown = function(selectedValue) {
                    if (selectedValue === "role")
                        $scope.roleSelected = true;
                    else
                        $scope.workspaceSelected = true;

                };
                function checkEmailunique(){
                    var filtered = $($scope.Users).filter(function () {
                    if(this._id === $scope.id){
                     //if it is edit mode no need to check with same userid.
                        return false;
                    }   
                        return angular.lowercase(this.email) === angular.lowercase($scope.email);
                    });
                    return filtered.length;

                };
                //Save User details in create and edit mode.
                $scope.saveUser = function() {
                    
                    $scope.wrk = document.getElementById("workspaceId").value;
                    if ($scope.myForm.$invalid){
                        return false;
                    }
                    if ($scope.role === 'Select Role') {
                        var ele1 = $("#errormessage").show();
                        msgService.showMsg(ele1, getlocalizeValue("msg.selectRole"));
                        return false;
                    }
                    if ($scope.wrk === "") {
                        var ele2 = $("#errormessage").show();
                        msgService.showMsg(ele2, getlocalizeValue("msg.selectWorkspace"));
                        return false;
                    }
                    if(checkEmailunique()>=1){
                        var ele3 = $("#errormessage").show();
                        msgService.showMsg(ele3, getlocalizeValue("msg.registeredEmail"));
                        return false;
                   }    
                    
                    var roleName = ($scope.roleSelected === true) ? $scope.role._id : $scope.getroleId($scope.role);
                     
                    //get workspace id by workspace name.
                    var  wrkSpaceId = $scope.getwrkspaceId($scope.wrk);
                    
                    var dataObj = {
                        _id: $scope.id,
                        firstname: $scope.firstname,
                        lastname: $scope.lastname,
                        loginname: $scope.Userloginname,
                        password: $scope.password,
                        email: $scope.email,
                        role: roleName,
                        workspaceId: wrkSpaceId,
                        LoginRole: sessionStorage.getItem("Role") 
                    };

                    // calling the servive to save User details while in create and edit mode.
                    services.CreateUser(dataObj, function(response) {
                        if (response != null) {
                            if (response === "true") {
                                var ele = $("#errormessage").show();
                                msgService.showMsg(ele, getlocalizeValue("msg.loginNameExits"));
                            } else {
                                $scope.$dismiss('save');
                                var ele = $("#saveMsg");
                                msgService.saveMsg(ele);
                                $rootScope.Users = response;
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