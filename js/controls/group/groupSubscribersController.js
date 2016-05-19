angular.module('myApp.controllers.GroupSubscribers',[])
.controller('GroupSubscribersCtrl',['$scope','PHP_server','notify',
    function($scope,PHP_server,notify){
    // главная
    $scope.meData={
        _id:1
    };
    // подписчики
    $scope.subscribers=[{
        user:{
            userpic:'data/user/face.jpg',
            firstname:'Sasha',
            secondname:'Prohorov',
            work:[{
                company:'company'
            }],
            personalData:{
                age:10
            },
            danceStyles:[{
                name:'Sasha'
            }],
            _id:1,
            isFollowing:false
        }
    }];
    // подписаться
    $scope.subscribeToUser=function(user,action,index){

    }
    // получения группы
    function getGroup() {
        var req={
            action:'GetGrouponId'
        };
            PHP_server.Group(req)
            .then(function(resolve) {
                //$scope.group = resolve;
                console.log(resolve);
            });
    };

    getGroup();
        // получение все подписчики
    $scope.getAllSubscribers = function() {
        var req={
            action:'GetSubscribe'
        }
        PHP_server.Subscribe(req)
            .then(function(resolve) {
                console.log(resolve);
               // $scope.subscribers = resolve.data;
            });
    }

    $scope.getAllSubscribers();

        // подписание на пользователя

    $scope.subscribeToUser = function(id, subscribeStatus, index) {
        var req = {
                action:'',
                route: 'followers',
                id: id
            },
            requestPromise, successMessage;
        switch (subscribeStatus) {
            case 'subscribe':
                req.actiion='setSubscribe';
                requestPromise = PHP_server.Subscribe(req);
                successMessage = 'Вы успешно подписались на пользователя';
                break;
            case 'unsubscribe':
                req.actiion='unsetSubscribe';
                requestPromise = PHP_server.Subscribe(req)
                successMessage = 'Вы успешно отписались от пользователя';
                break;
        }

        console.log(req);

        requestPromise.then(function(result) {
            getAllSubscribers();
            notify({
                message: successMessage,
                classes: 'alert-success',
                templateUrl: 'views/dialog/messages.html'
            });
        });
    };

}]);