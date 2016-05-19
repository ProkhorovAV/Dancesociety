angular.module("myApp.controllers.Main", [])
    .controller("MainCtrl", [
        "$scope",'$location','DialogsService','PHP_server',
        function ($scope,$location,DialogsService,PHP_server) {
            // данные для входа
            $scope.user={
                email:'kapter2002@yandex.ru',
                password:'123',
                firstName:'Саша',
                secondName:'Прохоров'

            }
            // переключения форм
            $scope.frm=[true,false,false];
            // функция переключения между страничками
            $scope.open_form=function(index){
                $scope.frm[0]=false;
                $scope.frm[1]=false;
                $scope.frm[2]=false;
                $scope.frm[index]=true;
            };

            // открыть с помошью логина и пароля
            $scope.EnterUser=function(){

                var params={
                    action:'getUserData',
                    data:{
                        email:$scope.user.email,
                        password:$scope.user.password
                    }
                };
                PHP_server.User(params)
                    .then(function(data){
                        console.log(data);
                    },function(err){

                    });

               // $location.path('news');
            };
            // зарегистрироваться
            $scope.RegistrUser=function(){

            };
            // войти без регистрации
            $scope.Enter=function(){
                DialogsService.messges_ok({
                    text:'Вход без регистрации ограничивает Ваш функционал'
                });
                $location.path('news');
            }



        }
    ]);
