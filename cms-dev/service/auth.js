angular.module('cms').factory('authService',function($http) {

	var service = {

        model:{
            user:null
        },
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

            var promise = $http.get('/api/login-status');

            promise.then(function(res){

                service.model.user = res.data;

            });

            return promise;

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
