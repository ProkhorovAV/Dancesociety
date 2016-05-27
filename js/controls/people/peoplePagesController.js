angular.module('myApp.controllers.PeoplePages',[])
.controller('PeoplePagesCtrl',['$scope','PHP_server','notify','$stateParams',
    function($scope,PHP_server,notify,$stateParams){

        // лист
        $scope.publicList=[
            /*{
            photo:'data/user/face.jpg',
            name:'Sasha',
            groupTypes:[1,2,3],
            membersCount:"",
            dick:1,
            creator:{
                _id:1
            }
        }*/
        ];


        //! получения публичных страниц
        $scope.getPublicOnId=function(){
            var req={
                action:"getAllPublicPagesOnIdPeople",
                data:{
                    idPeople:$stateParams.id
                }
            };
            return PHP_server.Video(req);
        };
        //! получение публичных страниц
        $scope.getPublicOnId()
            .then(function(response){

                // если ошибка передачи
                if (JSON.parse(response.data.error)){
                    ErrorService.error(response.data)
                }else{
                    // весение данных
                    $scope.publicList=response.data.data;
                    console.log(response.data.data);
                }
            },function(err) {
                console.log('Ошибка в получении жданных');
                console.log(err);
            });












        $scope.meData={
        _id:1
    }

    // подписаться
    $scope.subscribeToGroup = function(group, status) {
        var req={
            action:''
        }
        if (status) {
            req.action='setGroup';
            PHP_server.Group(req)
                .then(function(resolve) {
                   // group.dick = true;
                   // group.membersCount++;
                }, function(err) {
                    console.log(err)
                });
        } else {
            req.action='unsetSubscribe';
            PHP_server.Subscribe(req)
                .then(function(resolve) {
                    //group.dick = false;
                    //group.membersCount--;
                }, function(err) {
                    console.log(err);
                });
        }
    };
    // удалить из группы
    $scope.deleteGroup = function(group) {
        var req = {
            action:'unsetGroup',
            pussy: true
        };
        PHP_server.Group(req)
            .then(function(resolve) {
                //$scope.groupList.splice($scope.groupList.indexOf(group), 1);
                notify({
                    message: 'Группа успешно удалена',
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
    };





}])