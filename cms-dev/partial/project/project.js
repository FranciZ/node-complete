/* globals alert */

angular.module('cms').controller('ProjectCtrl',function(
    $scope,
    $stateParams,
    $state,
    $http,
    projectService,
    Upload){


    $scope.errors = {};
    $scope.options = {};
    $scope.model = {
        coverImage : null,
        images : []
    };

    $scope.isEdit = false;

    var id = $stateParams.id;

    if(id.length > 0){

        $scope.model = projectService.model.item;

        $scope.isEdit = true;

    }

    $scope.addUploadButton = function(){

        $scope.sections.push({ title:'' });

    };

    $scope.selectFile = function(file){

        $scope.options.selectedFile = file;

    };

    $scope.uploadImage = function(files){

        angular.forEach(files, function(file, index){

            Upload.upload({
                url: '/api/upload',
                data: {file: file }
            }).then(function(res){

                $scope.model.images.push(res.data);

            }, function(){

            }, function(){

            });

        });



    };

    $scope.upload = function(file){

        $scope.options.fileName = file.name;

        Upload.upload({
            url: '/api/upload',
            data: {file: file }
        }).then(function (res) {

            // on upload complete
            console.log(res);
            $scope.options.fileUploaded = file;
            $scope.model.coverImage = res.data;

        }, function (resp) {

        }, function (evt) {

            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.options.progressPercentage = progressPercentage;

        });

    };

    $scope.save = function(){

        console.log($scope.model);

        var error = false;
        var errMessage;
        var errArray = [];

        if(!$scope.model.title){
            error = true;
            $scope.errors.title = true;
            errMessage = 'No title';
        }
        if(!$scope.model.description){
            error = true;
            $scope.errors.description = true;
            errMessage = 'No description';
        }
        if($scope.model.title && $scope.model.title.length < 3){
            error = true;
            $scope.errors.title = true;
            errMessage = 'Title needs to be more than 3 characters';
        }
        if($scope.model.description && $scope.model.description < 3){
            error = true;
            $scope.errors.description = true;
            errMessage = 'Description needs to be more than 3 characters';
        }
        if(!$scope.model.coverImage){
            error = true;
            $scope.errors.coverImage = true;
            errMessage = 'You need to upload a cover image';
        }
        if($scope.model.images.length === 0){
            error = true;
            $scope.errors.images = true;
            errMessage = 'You need to upload at least one gallery image';
        }



        if(!error){

            if(!$scope.isEdit) {

                projectService.create($scope.model, function (data) {

                    $state.go('app.projects');

                });

            }else{

                projectService.update($scope.model._id, $scope.model, function (data) {

                    console.log(data);
                    $state.go('app.projects');

                });

            }

        }else{



        }



    };

});
