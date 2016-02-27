angular.module('cms').factory('articleService',function($http) {

	var article = {

        model:{
            list:[],
            item:null
        },
        create:function(data, cb){

            $http.post('/api/article', data)
                .then(function(res){

                    if(cb){
                        cb(res.data);
                    }

                });

        },
        getList:function(cb){

            return $http.get('/api/articles')
                .then(function(res){

                    var list = res.data;
                    article.model.list = list;

                    if(cb) {
                        cb(list);
                    }

                });

        },
        getOne:function(id){

            return $http.get('/api/article/'+id)
                .then(function(res){

                    var item = res.data;

                    article.model.item = item;

                });

        },
        remove:function(id, cb){
            $http.delete('/api/article/'+id)
                .then(function(res){

                    if(cb) {
                        cb(res);
                    }

                });
        }
    };

	return article;
});
