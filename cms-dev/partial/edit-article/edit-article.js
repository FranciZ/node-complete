angular.module('cms').controller('EditArticleCtrl',function($scope, $stateParams, articleService, projectService, $state){

    var id = $stateParams.id;

    $scope.projects = projectService.model.list;
    $scope.model = articleService.model.item;

    $scope.save = function(){
        articleService.update($scope.model._id, $scope.model, function(){
            $state.go('app.articles');
        });
    }

});
