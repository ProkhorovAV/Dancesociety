angular.module("myApp.controllers.Index", [])
    .controller("IndexCtrl", [
        "$scope",'$locale',
        function ($scope,$locale) {
            console.log('Вход');
            $scope.config_src={
                mainUrl:"http://dancietyMain:88/",
                imagesUserUrl:'http://dancietyMain:88/data/user/',
                imagesUrl:'http://dancietyMain:88/data/img/'
            };




            /*
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', 'config.json', false);
            xmlhttp.send(null);
            if (xmlhttp.status == 200) {
                $scope.config_src = JSON.parse(xmlhttp.responseText);

            }
            */
        }
    ]);

