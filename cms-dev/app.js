angular.module('cms', [
    'ui.bootstrap',
    'ui.utils',
    'ui.router',
    'ngAnimate',
    'ngFileUpload',
    'ui.tinymce'
]);

angular.module('cms').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app', {

        url:'/',
        abstract:true,
        views:{
            sidebar:{
                templateUrl:'partial/sidebar/sidebar.html',
                controller:'SidebarCtrl'
            },
            'main-header':{
                templateUrl:'partial/header/header.html',
                controller:'HeaderCtrl'
            }
        },
        resolve:{
             loginStatus:function($http, authService){

                return true;//authService.loginStatus();

             }
        }

    });

    $stateProvider.state('app.projects', {
        url: 'projects',
        views:{
            'main@':{
                resolve:{
                    projects:function(projectService){

                        return projectService.getList();

                    }
                },
                templateUrl: 'partial/projects/projects.html',
                controller:'ProjectsCtrl'
            }
        }

    });

    $stateProvider.state('app.project', {
        url: 'project/:id',
        views:{
            'main@':{
                resolve:{

                    project:function($stateParams,$location, projectService){

                        var id = $stateParams.id;
                        console.log($location.search());

                        if(id.length > 0) {
                            return projectService.getOne(id);
                        }else{
                            return true;
                        }

                    }
                },
                templateUrl: 'partial/project/project.html',
                controller:'ProjectCtrl'
            }
        }

    });
    $stateProvider.state('login', {
        url: '/login',
        views:{
            'main@':{
                templateUrl: 'partial/login/login.html',
                controller:'LoginCtrl'
            }
        }

    });
    $stateProvider.state('register', {
        url: '/register',
        views:{
            'main@':{
                templateUrl: 'partial/register/register.html',
                controller:'RegisterCtrl'
            }
        }

    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/login');

});

angular.module('cms').run(function($rootScope) {

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){

            if(toState.name === 'login' || toState.name === 'register'){
                $rootScope.isViewLogin = true;
            }else{
                $rootScope.isViewLogin = false;
            }

        });

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
