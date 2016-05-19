angular.module('myApp.controllers.PeoplePages',[])
.controller('PeoplePagesCtrl',['$scope','PHP_server','notify',
    function($scope,PHP_server,notify){
    $scope.meData={
        _id:1
    }
    // лист
    $scope.groupList=[{
        photo:'data/user/face.jpg',
        name:'Sasha',
        groupTypes:[1,2,3],
        membersCount:"",
        dick:1,
        creator:{
            _id:1
        }
    }];
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