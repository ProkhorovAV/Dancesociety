angular.module('myApp.controllers.PeopleHeder',[])
.controller('PeopleHederCtrl',['$scope','$modal','PHP_server',
    function($scope,$modal,PHP_server){
    // юзер

    $scope.user={
        bg:{path:'data/img/bg1.jpg'},
        // непонятная переменная
        //isMyProfile:true,
        userpic:{path:'data/user/face.jpg'},
        firstname:'Sasha',
        secondname:'Prokhorov',
        status:0,
        statusText:'text',
        isFollowing:true
    };

    // выбор картинки
    $scope.selectImage = function(maxCount, type) {
        var modalInstance = $modal.open({
            templateUrl: 'views/dialog/selectImage.html',
            controller: 'SelectImageCtrl',
            windowClass: 'select__image_window',
            /*
            resolve: {
                MAXCOUNT: function() {
                    return maxCount;
                },
                alreadySelected: function() {
                    return false;
                }
            }
            */
        });

        modalInstance.result.then(function(selectedList) {
            switch (type) {
                case 'bg':
                    changeBackgroundImage(selectedList[0]._id);
                    break;
                case 'userpic':
                    changeProfileImage(selectedList[0]._id);
                    break;
            }

        }, function() {
            notify({
                message: 'Вы не выбрали изображение',
                classes: 'alert-danger',
                templateUrl: 'views/dialog/messages.html'
            });
        });

    };
    // открыть картинку
    $scope.openImage=function(img,user){

    };
    //смена статуса
    $scope.changeStatus = function() {

        var req = {
            action:'ChangStatus',
            route: 'status',
        }
        //$scope.user.status = $scope.user.status ? 1 : 0;
        var data = {
            statusText: $scope.user.statusText,
            status: $scope.user.status
        }
        PHP_server.Status(req)
            .then(function(resolve) {
                console.log(resolve);
            }, function(err) {
                console.log(err);
            });

    }

    // подписаться на пользователя
        $scope.subscribeToUser = function(id, subscribeStatus) {

            var req = {
                    action:'',
                    route: 'followers',
                    id: id
                },
                requestPromise;
            switch (subscribeStatus) {
                case 'subscribe':
                    req.action='setSubscribe';
                    requestPromise = PHP_server.User(req);
                    break;
                case 'unsubscribe':
                    req.action='unsetSubscribe';
                    requestPromise = PHP_server.User(req);
                    break;
            }

            requestPromise.then(function(result) {
                console.log(result);
               // $state.reload();
            });

        };
    // сообщение открыть
    $scope.openUserMessage=function(user){
        // нет определения
    }

}]);