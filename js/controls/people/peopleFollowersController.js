angular.module('myApp.controllers.PeopleFollowers',[])
.controller('PeopleFollowersCtrl',['$scope','PHP_server',function($scope,PHP_server){
        $scope.meData={
            _id:1
        };
    // подписцики
        $scope.subscribers=[{
            _id:1,
            userpic:'data/user/face.jpg',
            firstname:'Sasha',
            secondname:'Prokhorov',
            work:[{
                company:'company'
            }],
            personalData:{
                age:12
            },
            danceStyles:[{
                name:'name'
            }],
            isFollowing:true

        }];
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