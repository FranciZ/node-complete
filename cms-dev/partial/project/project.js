angular.module('cms').controller('ProjectCtrl',function($scope, $http, projectService, Upload){

    $scope.sections = [
        {
            title:''
        }
    ];

    $scope.options = {};
    $scope.model = {
        images : []
    };

    $scope.addUploadButton = function(){

        $scope.sections.push({ title:'' });

    };

    $scope.selectFile = function(file){

        $scope.options.selectedFile = file;

    };

    $scope.uploadImage = function(file, section){




            Upload.upload({
                url: '/api/upload',
                data: {file: file }
            }).then(function(resp){

                section.coverImage = resp.data;

                console.log(resp.data);

            }, function(){

            }, function(){

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

        $scope.model.sections = $scope.sections;
        projectService.create($scope.model);

    };

});
