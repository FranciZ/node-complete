angular.module('cms').controller('ProjectsCtrl',function($scope, $state, projectService){

    $scope.list = [];

    projectService.getList(function(list){

        if(list instanceof Array) {
            $scope.list = list;
        }

    });

    $scope.logOut = function(){

        projectService.logOut(function(){

            $state.go('login');

        });

    };

    $scope.options = {
        orderFilter:'-date'
    };

    $scope.toggleDateOrder = function(){

        if($scope.options.orderFilter === '-date'){
            $scope.options.orderFilter = 'date';
        }else{
            $scope.options.orderFilter = '-date';
        }

    };

    $scope.createProject = function(){

        $state.go('project');

    };

});
