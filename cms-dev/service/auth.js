angular.module('cms').factory('authService',function($http) {

	var service = {

        registerUser:function(user, cb){

            $http.post('/api/register', user)
                .then(function(res){

                    if(cb){
                        cb(res);
                    }

                });

        },
        loginUser:function(user, cb){

            $http.post('/api/login', user)
                .then(function(res){

                    if(cb){
                        cb(res);
                    }

                });


        },
        loginStatus:function(){

            return $http.get('/api/login-status');

        },
        logOut:function(cb){

            $http.post('/api/logout', {})
                .then(function(res){

                    if(cb){
                        cb();
                    }

                });

        }

    };

	return service;
});
