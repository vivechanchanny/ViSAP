(function() {
    'use strict';

    angular
        .module('workspace')
        .controller('LoginController',
            function($scope, $rootScope, $cookies, $modal, $location, $http, services) {

                $rootScope.admin = "2";

                $scope.navigate = function() {
                    $location.path('/forgotpassword'); //To navigate to forgotpassword page. location.path will load all the necessary files.
                }

                $scope.validateuser = function() {
                    var dataObj = {
                            userName: $scope.username,
                            pwd: $scope.password
                        }
                        // if the logged in user is not super admin then get user information
                    services.GetUsersbyName(function(dataResponse) {
                        var UserData = dataResponse;
                        if (UserData.length > 0) {
                            var Appuser = {
                                lastname: UserData[0].lastname,
                                firstname: UserData[0].firstname,
                                environment: configData.environment
                            }

                            sessionStorage.setItem("userid", UserData[0]._id);
                            sessionStorage.setItem("workspaceid", UserData[0].workspaceId);
                            sessionStorage.setItem("userEmail", UserData[0].email);

                            sessionStorage.setItem("AppUser", JSON.stringify(Appuser));
                            sessionStorage.setItem("loginname", UserData[0].lastname + "," + UserData[0].firstname);
                            $rootScope.loginname = sessionStorage.getItem("AppUser");
                        }
                    }, $scope.username);

                    if (($scope.username && $scope.username !== "") && ($scope.password && $scope.password !== "")) {
                        services.ValidateUser(dataObj, function(Response) {
                            if (Response !== "" && Response != null) {
                                var authToken = Response.userToken;
                                var role = Response.userRole;
                                sessionStorage.setItem('authT', authToken);
                                $cookies.put("authtoken", authToken);
                                sessionStorage.setItem('Role', role);
                                if (role === "1")
                                    $location.path('/workspace');
                                else if (role === "3" || role === "4") {
                                    getAppsettings();
                                } else if (role === $rootScope.admin) {
                                    $location.path('/users');
                                } else
                                    $("#loginmsg").html(getlocalizeValue('login.loginValidation'));

                                //to get the workspace name for loged in user
                                services.getworkspaceName(sessionStorage.getItem("authT"), function(Response) {
                                    var workspaceDetails = Response;
                                    sessionStorage.setItem("workSpaceName", workspaceDetails.name);
                                    $rootScope.workSpaceName = workspaceDetails.name;
                                });
                            } else
                                $("#loginmsg").html(getlocalizeValue('login.loginValidation'));
                        });
                    }
                }

                function getAppsettings() {
                    var URLvalue = {
                        visapURL: "visapURL"
                    };
                    services.getAppSettingsValues(URLvalue, function(data) {
                        window.location.href = data.visapURL;
                    });
                }
                //This method will invoke the validatemail service to check the email is registered or not.
                $scope.validateEmail = function() {
                        if ($scope.emailid === undefined || $scope.emailid === "") return false;
 
                        var emailObj = {
                            emailID: 'emailID,',
                            emailAddress: $scope.emailid,
                            ng: false
                        }; 
                        
                        services.checkEmailRegistered(emailObj, function(dataResponse) {
                            if (dataResponse === "True") {
                                $("#loginmsg").html(getlocalizeValue('login.validEmail'));
                            } else {
                                $("#loginmsg").html(dataResponse);

                            }

                        }, $scope.emailid);

                    }
                    //To reset the password with new password
                $scope.resetPassword = function() {
                        var userToken = getQueryString(); //Getting querystring value(token) from href
                        var passwordObj = {
                            newPassword: $scope.newPassword,
                            token: userToken,
                             ng: false
                        };
                        if ($scope.newPassword === $scope.confirmPassword) {
                            services.ResetPassword(passwordObj, function(dataResponse) {
                            var res = JSON.parse(dataResponse);
                                if (res === "True") {
                                    $("#loginmsg").html(getlocalizeValue('login.resetSuccess') + "<a href='" + configData.loginPage + "'>" + getlocalizeValue('login.relogin') + "</a>");

                                } else {
                                    $("#loginmsg").html(res);
                                }
                            });

                        } else {
                            $("#loginmsg").html(getlocalizeValue('login.notMatched'));
                        }
                        $("#newpwd").val("");
                        $("#confirmpwd").val(""); //clearing the value once the password is reset successfully.
                    }
                    //To get the querystring from window.location.href.
                function getQueryString() {
                    var href = window.location.href;
                    var reg = new RegExp('[?&]' + "t" + '=([^&#]*)', 'i');
                    var string = reg.exec(href);
                    return string ? string[1] : null;

                }
                $scope.clearMsg = function() {
                    $("#loginmsg").html("");
                }


            }
        );

})();