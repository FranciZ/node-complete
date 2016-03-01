angular.module('cms').controller('NewArticleCtrl',function($scope, articleService, projectService,$state){

    $scope.projects = projectService.model.list;

    $scope.article = {};
    $scope.create = function(){
        articleService.create($scope.article, function (data) {

            $state.go('app.articles');

        });
    }



});
