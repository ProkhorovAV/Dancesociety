// подписчики
angular.module('myApp.controllers.PeopleSubscriers',[])
    .controller('PeopleSubscriersCtrl',['$scope','PHP_server','$stateParams',function($scope,PHP_server,$stateParams){


        // данные об подписчиках
        $scope.SubscibersArray={
            data:[{
                author:{
                    _id:1,
                    userpic:'data/user/face.jpg',
                    firstname:"Sasha",
                    secondname:"Prokhorov"
                },
                positive:true,
                created:'12.12.2009',
                text:'text'
            }]
        };


        //! получения подписчиков
        $scope.getSubscibersOnId=function(){
            var req={
                action:"getSubscibersOnId",
                data:{
                    idPeople:$stateParams.id
                }
            };
            return PHP_server.User(req);
        };
        //! получение подписчиков
        $scope.getSubscibersOnId()
            .then(function(response){

                // если ошибка передачи
                if (JSON.parse(response.data.error)){
                    ErrorService.error(response.data)
                }else{
                    // весение данных
                    $scope.SubscibersArray=response.data.data;
                }
            },function(err) {
                console.log('Ошибка в получении жданных');
                console.log(err);
            });

















        // все
        $scope.meData={
            _id:1
        }

        // открыть сообщение
        $scope.openUserMessage=function(sub){
            // нет определения
        };
        //  подписаться
        $scope.subscribeToUser = function(id, subscribeStatus, index) {
            var req = {
                action:'',
                    route: 'followers',
                    id: id
                },
                requestPromise, successMessage;
            switch (subscribeStatus) {
                case 'subscribe':
                    req.action='setSubscribe';
                    requestPromise = PHP_server.Subscribe(req);
                    successMessage = 'Вы успешно подписались на пользователя';
                    break;
                case 'unsubscribe':
                    req.action='unsetSubscribe';
                    requestPromise = PHP_server.Subscribe(req);
                    successMessage = 'Вы успешно отписались от пользователя';
                    break;
            }



            requestPromise.then(function(result) {
                /*
                  getAllSubscribers().then(function(response) {
                    // $scope.subscribers[index].isFollowing = response.data[index].isFollowing;
                    $scope.subscribers = response.data;
                    console.log(response);
                 });
                */
                notify({
                    message: successMessage,
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
        };




    }]);