angular.module('cms').controller('EditArticleCtrl',function($scope, $stateParams, articleService){

    var id = $stateParams.id;

    $scope.model = articleService.model.item;

});
