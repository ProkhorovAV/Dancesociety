angular.module('myApp.controllers.PageSubscribers',[])
.controller('PageSubscribersCtrl',['$scope','PHP_server','notify','$stateParams',
    function($scope,PHP_server,notify,$stateParams){

        // подписчики
        $scope.subscribers=[
            /*{
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
        }
        */
        ];

        //! получения новостей от группы
        $scope.getPublicPageOnId=function(){
            var req={
                action:"getSubscribersOnIdPage",
                data:{
                    idPage:$stateParams.id
                }
            };
            return PHP_server.Vacancy(req);
        };
        //! получение новостей от группы
        $scope.getPublicPageOnId()
            .then(function(response){

                // если ошибка передачи
                if (JSON.parse(response.data.error)){
                    ErrorService.error(response.data)
                }else{
                    // весение данных
                    $scope.subscribers=response.data.data;
                    console.log(response.data);
                }
            },function(err) {
                console.log('Ошибка в получении жданных');
                console.log(err);
            });








        // главная
    $scope.meData={
        _id:1
    };

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