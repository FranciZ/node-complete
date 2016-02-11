angular.module('cms').controller('LoginCtrl',function($scope, $state, authService){

    $scope.loginUser = {};

    $scope.login = function(){

        authService.loginUser($scope.loginUser, function(res){

            $state.go('projects');

        });

    };


});
