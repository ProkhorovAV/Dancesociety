angular.module('myApp.controllers.GroupHeder',[])
.controller('GroupHederCtrl',['$scope','$modal','PHP_server',function($scope,$modal,PHP_server){
    // нет определения для контроллера
    console.log('grouprheder');
            $scope.meData={
                _id:1
            };
            $scope.group={
                bg:'data/img/bg1.jpg',
                creator:{
                    _id:1
                },
                photo:'data/img/bg1.jpg',
                name:"имя",
                groupType:1,
                shortDescription:'text',
                dick:true,
                membersCount:10

            };
            // валидный клик
            $scope.selectImage=function(maxCount,type){
                console.log('выбрать картинку');
                var modalInstance = $modal.open({
                    templateUrl: 'views/dialog/selectImage.html',
                    controller: 'SelectImageCtrl',
                    windowClass: 'select__image_window',
                    resolve: {
                        MAXCOUNT: function() {
                            return maxCount;
                        },
                        alreadySelected: function() {
                            return false;
                        }
                    }
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
                        templateUrl: 'views/notify.html'
                    });
                });


            };
            // открыть картинку
            $scope.openImage=function(photo,creater){

            };
            // выбрать картинку
            $scope.selectImage=function(index,select){

            };
            // подписаться или отписаться на группу
            $scope.subscribeToGroup=function(group,bool){
                // заглушка на переменную опеделяющую статус
                var status=true;
                if(status) {
                    var req={
                        action:'setGroup'
                    }
                    PHP_server.Group(req)
                        .then(function(resolve) {
                            console.log(resolve);
                           // group.dick = true;
                            //group.membersCount++;
                        }, function(err) {
                            console.log(err);
                        });
                } else {
                    var req={
                        action:'deleteGroup'
                    }
                    PHP_server.Group(req)
                        .then(function(resolve) {
                            console.log(resolve);
                            //group.dick = false;
                            //group.membersCount--;
                        }, function(err) {
                            console.log(err);
                        });
                }
            };
            // начать общаться
            $scope.openUserMessage=function(user){

            }

       // смена статуса пока закрыта тк закрыта в html
       /*
        $scope.changeStatus = function(description) {
            var req = {
                'fullDescription': $scope.group.fullDescription,
                'shortDescription': $scope.group.shortDescription,
            }
            console.log(req);
            $http.put($window.danceConfig.restUrlBase + '/api/groups/' + groupId + '/descriptions', req)
                .then(function(resolve) {
                    console.log(resolve);
                }, function(reject) {

                })
        }
        */



} ]);