/* globals confirm */

angular.module('cms').controller('ProjectsCtrl',function($scope, $state, authService, projectService){

    $scope.list = projectService.model.list;

    $scope.deleteProject = function(id){

        var c = confirm('Are you sure?');

        if(c) {

            projectService.remove(id, function () {

                angular.forEach($scope.list, function (project, index) {

                    if (project._id === id) {
                        $scope.list.splice(index, 1);
                    }

                });

            });

        }

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

        $state.go('app.project');

    };

});
