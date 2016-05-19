angular.module('myApp.controllers.PeopleSubscriers',[])
    .controller('PeopleSubscriersCtrl',['$scope','PHP_server',function($scope,PHP_server){
        // все
        $scope.meData={
            _id:1
        }
        // массив
        $scope.subscribers=[{
            userpic:'data/user/face.jpg',
            firstname:'Sasha',
            secondname:'Prokhorov',
            work:[{
            company:'12'
        }],
            personalData:{
                age:12
            },
            danceStyles:[{
                name:"dance"
            }],
            _id:1,
            isFollowing:true
        }];
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
        // получение перечня подписчиков
        $scope.getAllSubscribers = function() {
            var req = {
                action:'GetSubscribe',
                route: 'followers',
                id: $scope.user._id
            };
            return PHP_server.Subscribe(req)
                .then(function(response) {
                //$scope.subscribers = response.data;
                console.log(response);
            });
        };

        $scope.getAllSubscribers();



    }]);