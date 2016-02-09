angular.module('cms').factory('projectService',function($http) {

	var project = {

        model:{
            list:[],
            item:null
        },
        create:function(data){

            $http.post('/api/project', data)
                .then(function(res){

                    console.log(res);

                });

        },
        logOut:function(cb){

            $http.post('/api/logout', {})
                .then(function(res){

                    if(cb){
                        cb();
                    }

                });

        },
        getList:function(cb){

            $http.get('/api/projects')
                .then(function(res){

                    var list = res.data;
                    project.model.list = list;

                    if(cb) {
                        cb(list);
                    }

                });

        }
    };

	return project;
});
