angular.module('cms').controller('ArticlesCtrl',function($scope, articleService){

    $scope.list = articleService.model.list;

});
