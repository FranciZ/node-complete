angular.module('cms').controller('ArticlesCtrl',function($scope, articleService){

    $scope.list = articleService.model.list;

    $scope.delete = function(id){

        var c = confirm('Are you sure?');

        if(c) {

            articleService.remove(id, function () {

                angular.forEach($scope.list, function (article, index) {

                    if (article._id === id) {
                        $scope.list.splice(index, 1);
                    }

                });

            });

        }

    };

});
