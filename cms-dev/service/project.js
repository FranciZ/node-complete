angular.module('cms').factory('projectService',function($http) {

	var project = {

        create:function(data){

            $http.post('/api/project', data)
                .then(function(res){

                    console.log(res);

                });

        }
    };

	return project;
});
