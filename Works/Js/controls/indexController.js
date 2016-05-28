angular.module("myApp.controllers.Index", [])
    .controller("IndexCtrl", [
        "$scope",
        function ($scope) {
            console.log('Вход');
            // глобальная переменная путей
            $scope.SERVER={
                "IMAGES_USER":'http://dancesociety:88/data/Server/UserPhoto/',
                'IMAGES_PHOTO':'http://dancesociety:88/data/Server/Photos/',
                'IMAGES_VIDEO':'http://dancesociety:88/data/Server/Videos/'
            }

        }
    ]);

