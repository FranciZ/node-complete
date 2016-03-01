angular.module('cms').factory('projectService',function($http) {

	var project = {

        model:{
            list:[],
            item:null
        },
        create:function(data, cb){

            $http.post('/api/project', data)
                .then(function(res){

                    if(cb){
                        cb(res.data);
                    }

                });

        },
        getOne:function(id){

            return $http.get('/api/project/'+id)
                .then(function(res){

                    var item = res.data;
                    project.model.item = item;

                });

        },
        getList:function(cb){

            return $http.get('/api/projects')
                .then(function(res){

                    var list = res.data;
                    project.model.list = list;

                    if(cb) {
                        cb(list);
                    }

                });

        },
        remove:function(id, cb){

            $http.delete('/api/project/'+id)
                .then(function(res){

                if(cb) {
                    cb(res);
                }

            });

        },
        /**
         *
         * @param {String} id
         * @param {Object} data
         * @param {Function} cb
         * @returns {*}
         */
        update:function(id, data, cb){

            return $http.put('/api/project/'+id,data)
                .then(function(res){

                    project.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }

                });

        }
    };

	return project;
});

