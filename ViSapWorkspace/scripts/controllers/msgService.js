(function() {

    'use strict'; //javaScript code should be executed in "strict mode".

    angular.module('workspace').service('msgService', function() {
    
        //this fn displays modal with callback fn.
        this.confirmation = function($scope, $modal, obj, callback) {

            $scope.confirmModalName = obj.msg; //message to display in modal.

           //show's the message confirmation modal.
            $scope.msgModalInstance = $modal.open({
                templateUrl: 'views/modal.confirmation.html',
                size: 'custom',    //size of the modal customized.
                backdrop: 'static',
                keyboard: true,
                scope: $scope
            });

            //after confirmation this fn will call corresponding callback fn.      
            $scope.confirmToDel = function() {
                callback(true, obj);
                $scope.msgModalInstance.close(); //modal will close.
            }

            //this fn closes the modal.   
            $scope.cancelModal = function() {
                $scope.msgModalInstance.close(); //modal will close.
            }
        }
        
        //message will display on the html element.
        this.showMsg = function(ele,msg){
           ele.html(msg).show().delay(4000).fadeOut();
        }
        
        //pop up message will display after saved successfully.
        this.saveMsg = function(ele){
            ele.show();
            setTimeout(function () {ele.hide(); }, 1500);
        }
        
    });

})();