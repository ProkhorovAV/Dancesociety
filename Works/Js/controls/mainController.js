angular.module("myApp.controllers.Main", [])
    .controller("MainCtrl", [
        "$scope",'$location','DialogsService','PHP_server','ErrorService','user_dataService',
        function ($scope,$location,DialogsService,PHP_server,ErrorService,user_dataService) {

            // данные для входа
            $scope.user={
                email:'kapter2002@yandex.ru',
                password:'123',
                firstName:'Саша',
                secondName:'Прохоров'

            };
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
                // отправка данных
                PHP_server.User(params)
                    .then(function(requirements){
                        console.log(requirements.data.error);
                        if (JSON.parse(requirements.data.error)){
                            ErrorService.error({
                                text:requirements.data.data,
                                console:requirements.data
                            });
                        }else{
                            DialogsService.messges_ok({
                                text:'Здравствуйте '+requirements.data.data.firstName+' '+requirements.data.data.secondName
                            });
                            // сохранение в базе данных о пользователе
                            user_dataService.SetData(requirements.data.data);
                            user_dataService.SetEmail($scope.user.email);
                            user_dataService.SetPassword($scope.user.password);
                            user_dataService.settemp(10);
                            $scope.user.email='';
                            $scope.user.password='';


                            // переход на страницу
                            $location.path('news');
                        }
                    },function(err){
                        ErrorService.error({
                            text:'Ошибка! Страница не найдена',
                            console:err
                        });
                    });
            };
            // зарегистрироваться
            $scope.RegistrUser=function(){
                alert('Пока в работе воспользуйтесь входом без регистрации');
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
