angular.module('cms').controller('LoginCtrl',function($scope, $http){

    $scope.login = function(){

        $http.post('/api/login', $scope.loginUser)
            .then(function(res){
                console.log(res.data);
            });

    };


});
