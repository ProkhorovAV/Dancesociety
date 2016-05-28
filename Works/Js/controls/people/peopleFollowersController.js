angular.module('myApp.controllers.PeopleFollowers',[])
.controller('PeopleFollowersCtrl',['$scope','PHP_server','$stateParams',
    function($scope,PHP_server,$stateParams){


    // данные об подписчиках
    $scope.followersArray={
        /*
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
        */
    };


    //! получения подписчиков
    $scope.getfollowersOnId=function(){
        var req={
            action:"getFollowersOnId",
            data:{
                idPeople:$stateParams.id
            }
        };
        return PHP_server.User(req);
    };
    //! получение подписчиков
    $scope.getfollowersOnId()
        .then(function(response){

            // если ошибка передачи
            if (JSON.parse(response.data.error)){
                ErrorService.error(response.data)
            }else{
                // весение данных
                $scope.followersArray=response.data.data;
            }
        },function(err) {
            console.log('Ошибка в получении жданных');
            console.log(err);
        });















    $scope.meData={
        _id:1
    };

    // открыть сообщения
    $scope.openUserMessage=function(sub){

    }
    //подписаться или отписаться
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
                successMessage = 'Вы успешно подписались на пользователя'
                break;
            case 'unsubscribe':
                req.action='unsetSubscribe';
                requestPromise = PHP_server.Subscribe(req)
                successMessage = 'Вы успешно отписались от пользователя'
                break;
        }

        requestPromise.then(function(result) {

            /*
            getAllSubscribers().then(function(response) {
                $scope.subscribers[index].isFollowing = response.data[index].isFollowing;

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