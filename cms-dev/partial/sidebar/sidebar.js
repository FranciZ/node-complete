angular.module('cms').controller('SidebarCtrl',function(
    $scope,
    $state,
    authService){

    $scope.user = authService.model.user;

    $scope.menuItems = [

        {
            name:'Projects',
            state:'app.projects'
        },
        {
            name:'Articles',
            state:'app.articles'
        }

    ];

    $scope.logOut = function(){

        authService.logOut(function(){

            $state.go('login');

        });

    };

});
