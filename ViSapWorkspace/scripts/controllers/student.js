(function() {
    'use strict';

    angular
        .module('workspace')
        .controller('StudentController', ['$scope', '$rootScope', '$modal', 'services', 'msgService', '$http', '$log', '$window',
            function($scope, $rootScope, $modal, services, msgService, $http, $log, $window) {

                $scope.loginname = sessionStorage.getItem("loginname");
                $scope.workspaceid = sessionStorage.getItem("workspaceid");
                $scope.currentuserid = sessionStorage.getItem("userid");

                services.getUserbyworkspaceId(function(dataResponse) {
                    $scope.selection = [];
                    var alluserlist = dataResponse;
                    $scope.employees = [];

                    if (alluserlist.length <= 1)
                        $scope.userlist = true; //display's message block, if there no users.

                    // List of user except logged in user
                    angular.forEach(alluserlist, function(usrdata) {
                        if (usrdata._id !== $scope.currentuserid) {
                            $scope.userContainer = true; //display's list of user block.
                            $scope.employees.push(usrdata);
                        }
                    });

                    var groupUsers = $scope.getMappedUers();
                    var filterdUsers = $scope.employees;
                    //select-all checkbox functionality.
                    if (groupUsers !== undefined) {
                        if ($scope.employees.length === groupUsers.length)
                            $scope.selectedAll = true; //select the checkbox. 

                        // check if the user is alerady mapped into current group
                        for (var j = 0; j < filterdUsers.length; j++) {
                            if (groupUsers.indexOf(filterdUsers[j]._id) !== -1) {
                                filterdUsers[j].isMapped = true;
                            }
                        }
                    }
                }, $scope.currentuserid, "true"); //here sending true to exclude admin   

                //Select or Unselect the select-all checkbox.
                $scope.SelectedUser = function() {
                    var selectedList = $scope.getSelectedUsers();
                    if ($scope.employees.length === selectedList.length) {
                        $scope.selectedAll = true; //Selects the select-all checkbox.           
                    } else
                        $scope.selectedAll = false; //Unselects the select-all checkbox.     
                };

                //Get selected user list.
                $scope.getSelectedUsers = function() {
                    $scope.selectedUsers = [];
                    angular.forEach($scope.employees, function(employee) {
                        if (employee.isMapped) $scope.selectedUsers.push(employee._id);
                    });
                    return $scope.selectedUsers;
                };

                $scope.addUsertoGroup = function() {

                    var selectedList = $scope.getSelectedUsers();

                    if (selectedList.length) {
                        $scope.groupvalues = {
                            groupid: $scope.groupid,
                            userlist: selectedList
                        }
                        services.addUsertoGroup($scope.groupvalues, function(status) {
                            if (status === 200) {
                                $scope.closeMyPopup();
                                var ele = $("#saveMsg");
                                msgService.saveMsg(ele);
                            }
                            setTimeout(function() {
                                $window.location.reload();
                            }, 1000);

                        }, $scope.groupvalues);
                    } else {
                        var ele = $("#errormessage").show();
                        msgService.showMsg(ele, getlocalizeValue("msg.chooseUser"));
                    }
                }

                //To select all the groups in the manage users pop UI.
                $scope.selectAllGroups = function() {
                    if ($scope.selectedAll) {
                        $scope.selectedAll = true; //select the checkbox.
                    } else {
                        $scope.selectedAll = false; //unselect the checkbox.
                    }
                    angular.forEach($scope.employees, function(employee) {
                        employee.isMapped = $scope.selectedAll; //select or unselect the checkbox.
                    });
                }

                $scope.getMappedUers = function() {
                    for (var j = 0; j < $rootScope.grouplist.length; j++) {
                        if ($rootScope.grouplist[j]._id == $scope.groupid) {
                            $scope.groupname = $rootScope.grouplist[j].name;
                            return $rootScope.grouplist[j].mappedusers;
                        }

                    }
                }

            }
        ]);

})();