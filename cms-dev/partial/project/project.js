angular.module('cms').controller('ProjectCtrl',function($scope, $http, projectService, Upload){

    $scope.options = {};

    $scope.selectFile = function(file){

        $scope.options.selectedFile = file;

    };

    $scope.upload = function(file){

        console.log(file);

        $scope.options.fileName = file.name;

        Upload.upload({
            url: '/api/upload',
            data: {file: file }
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            $scope.options.fileUploaded = file;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);

            $scope.options.progressPercentage = progressPercentage;

        });

    };

    $scope.save = function(){

        projectService.create($scope.model);

    };

});
