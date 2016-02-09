angular.module('cms').controller('RegisterCtrl',function($scope, $http){

    $scope.user = {};
    $scope.loginUser = {};

    $scope.register = function(){

        console.log($scope.user);

        $http.post('/api/register', $scope.user)
            .then(function(res){
                console.log(res.data);
            });

    };


});
