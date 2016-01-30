angular.module('cms').controller('ProjectsCtrl',function($scope, $state){

    $scope.createProject = function(){

        $state.go('project');

    };

});
