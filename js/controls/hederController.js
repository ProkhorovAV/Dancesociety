angular.module("myApp.controllers.Heder", [])
    .controller("HederCtrl", ["$scope",'PHP_server', function ($scope,PHP_server) {
            console.log("hederCtrl");
            // главная ссылка
            $scope.meData={
                firstname:"Sad",
                userpic:"data/user/face.jpg"
             };
            // правая пенель не рабочая
            $scope.lang={

            };
            $scope.languageList={

            };
            // переменные для открытия меню
            $scope.status={
                isopenMenu:true,
                isopen:true,
                isopenLanguageMenu:true
            };
            $scope.usersSearch=[{
                userpic:'data/user/face.jpg',
                firstname:"Sasha",
                secondname:"Prokhorov"

            }];

            // кнопка меню
            $scope.toggleDropdown=function($event){
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isopenMenu = !$scope.status.isopenMenu;
            };

            // событие поиска в строке подвязано на ng-change
            $scope.search=function(q){

                PHP_server.Search({
                    action:'searchHeder',
                    q: q
                })
                    .then(function (response) {
                        // здесь присылаются данные и вносятся в список
                        //$scope.usersSearch = response.data;

                        // open a dropdown search list, if data exist
                        if (response.data.length > 0) {
                            $scope.status.isopen=true;
                           // $scope.status = {
                            //    isopen: true
                           // }
                        } else {
                            $scope.status.isopen=false;
                           // $scope.status = {
                           //     isopen: false
                           // }
                        }
                    });
            };
            // поле поиска
            $scope.searchInput="";
            // открыть правую кнопку
            $scope.openLanguageMenu=function(event){
                console.log(event);
            };
            // изменения языка
            $scope.changeActiveLanguage=function(){

            };
            // язык
            $scope.languageList=['Rus','Eng'];
            // выход
            $scope.logout=function(){
                window.location.href = "/";
            };
        // открытие меню второго
        /*
        $scope.openMessageMenu = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopenMessageMenu = !$scope.status.isopenMessageMenu;
        }
        */
        // открыть меню для выбора языка
        /*

         $scope.openLanguageMenu = function () {
         $scope.status.isopenLanguageMenu = !$scope.status.isopenLanguageMenu;
         }


        */



        }
    ]);
