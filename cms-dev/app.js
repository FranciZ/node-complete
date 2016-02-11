angular.module('cms', [
    'ui.bootstrap',
    'ui.utils',
    'ui.router',
    'ngAnimate',
    'ngFileUpload',
    'ui.tinymce'
]);

angular.module('cms').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('projects', {
        url: '/projects',
        resolve:{
            loginStatus:function($http, authService){
                return authService.loginStatus();
            }
        },
        templateUrl: 'partial/projects/projects.html'
    });

    $stateProvider.state('project', {
        url: '/project',
        resolve:{
            loginStatus:function($http, authService){
                return authService.loginStatus();
            }
        },
        templateUrl: 'partial/project/project.html'
    });
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'partial/login/login.html'
    });
    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'partial/register/register.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/login');

});

angular.module('cms').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
