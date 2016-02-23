angular.module('cms').controller('NewArticleCtrl',function($scope, projectService){


    $scope.projects = projectService.model.list;

    $scope.article = {};


});
