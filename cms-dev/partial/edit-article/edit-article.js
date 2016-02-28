angular.module('cms').controller('EditArticleCtrl',function($scope, $stateParams, articleService, $state){

    var id = $stateParams.id;

    $scope.model = articleService.model.item;

    $scope.save = function(){
        articleService.update($scope.model._id, $scope.model, function(){
            $state.go('app.articles');
        });
    }

});
