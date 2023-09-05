 (function() {
     'use strict';

     angular
         .module('workspace')
         .factory('services', services);

     services.$inject = ['$http'];

     function services($http) {

         var service = {};

         service.createWorkSpace = createWorkSpace;
         service.CreateUser = CreateUser;
         service.GetAllWorkspaces = GetAllWorkspaces;
         service.GetAllGroup = GetAllGroup;
         service.GetGroupbyUserID = GetGroupbyUserID;
         service.GetAllUsers = GetAllUsers;
         service.GetAllRoles = GetAllRoles;
         service.getAppSettingsValues = getAppSettingsValues;
         service.ValidateUser = ValidateUser;
         service.getworkspaceName = getworkspaceName;
         service.GetSearchResults = GetSearchResults;
         service.DeleteWorkspace = DeleteWorkspace;
         service.DeleteGroup = DeleteGroup;
         service.DeleteUser = DeleteUser;
         service.createGroup = createGroup;
         service.GetUsersbyName = GetUsersbyName;
         service.getUserbyworkspaceId = getUserbyworkspaceId;
         service.addUsertoGroup = addUsertoGroup;
         service.checkEmailRegistered = checkEmailRegistered;
         service.ResetPassword = ResetPassword;

         return service;

         function getAppSettingsValues(obj, callback) {
           
            var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     "X-workspace": true,
                     'Accept': 'application/json;odata=verbose',
                      'X-Authorization': sessionStorage.getItem('authT'),
                 }
             };
             var response;
             $http.post('config.do', obj, config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }

         function checkEmailRegistered(emailObj, callback, emailid) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose'
                 }
             };
             var response;
             $http.post('email.do', emailObj, config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 }).error(function(data){
                     response = data;
                     callback(response);
                 })
         }

         function ResetPassword(passwordObj, callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose'
                 }
             };
             var response;
             $http.post('reset.do', passwordObj, config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 }).error(function(data){
                     response = data;
                     callback(response);
                 })
         }


         function DeleteWorkspace(dataObj, callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     "X-Delete": "delete",
                     'Accept': 'application/json;odata=verbose'
                 }
             };

             var response;
             $http.post('workspace.do', dataObj, config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }


         function DeleteGroup(dataObj, callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     "X-Delete": "delete",
                     'Accept': 'application/json;odata=verbose'
                 }
             };

             var response;
             $http.post('group.do', dataObj, config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }



         function DeleteUser(dataObj, callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     "X-Delete": "delete",
                     'Accept': 'application/json;odata=verbose'
                 }
             };

             var response;
             $http.post('users.do', dataObj, config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }

         function createWorkSpace(dataObj,editMode, callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose',
                     'EditMode':editMode
                 }
             };

             var response;
             $http.post('workspace.do', dataObj, config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }

         function CreateUser(dataObj, callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose',
                 }
             };

             var response;
             $http.post('users.do', dataObj, config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }

         function GetAllWorkspaces(callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose'
                 }
             };

             var response;
             $http.get('workspace.do', config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }


         function GetAllRoles(callback, excludeAdmin) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose',
                     "excludeAdmin": excludeAdmin,
                 }
             };

             var response;
             $http.get('roles.do', config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }

         function GetAllGroup(callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose'
                 }
             };

             var response;
             $http.get('group.do', config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }


         function GetGroupbyUserID(callback, userid) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose',
                     "UserID": userid,
                 }
             };

             var response;
             $http.get('group.do', config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }




         function GetSearchResults(dataObj, callback, wsId) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose',
                     'workspaceID': wsId
                 }
             };

             var response;
             $http.post('search.do', dataObj, config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }




         function GetAllUsers(callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose'
                 }
             };

             var response;
             $http.get('users.do', config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }

         function GetUsersbyName(callback, username) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose',
                     "UserName": username,
                 }
             };

             var response;
             $http.get('users.do', config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }

         function getUserbyworkspaceId(callback, userId, excludeAdmin) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose',
                     "userID": userId,
                     "excludeAdmin": excludeAdmin,
                 }
             };

             var response;
             $http.get('users.do', config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }

         function ValidateUser(dataObj, callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose'
                 }
             };

             var response;
             $http.post('auth.do', dataObj, config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })

         }
         //to get the loged in user workspacename
         function getworkspaceName(xtoken, callback) {

             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose',
                     'X-UserToken': true,
                     'X-Authorization': xtoken,
                 }
             };
             var response;
             $http.get('workspace.do', config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }
         // private functions

         function createGroup(dataObj,editMode, callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose',
                     'EditMode':editMode
                 }
             };

             var response;
             $http.post('group.do', dataObj, config)
                 .success(function(data) {
                     response = data;
                     callback(response);
                 })
         }

         function addUsertoGroup(dataObj, callback) {
             var config = {
                 headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true,
                     'Accept': 'application/json;odata=verbose',
                     "X-MAP": "mapusers",
                 }
             };

             var response;
             $http.post('group.do', dataObj, config)
                 .success(function(data, status) {
                     response = status;
                     callback(response);
                 })
         }
     }

 })();