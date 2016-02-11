angular.module('cms').controller('ProjectsCtrl',function($scope, $state, authService, projectService){

    $scope.list = [];

    projectService.getList(function(list){

        if(list instanceof Array) {
            $scope.list = list;
        }

    });

    $scope.deleteProject = function(id){

        projectService.remove(id, function(){

            angular.forEach($scope.list, function(project, index){

                if(project._id === id){
                    $scope.list.splice(index,1);
                }

            });

        });

    };

    $scope.logOut = function(){

        authService.logOut(function(){

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
