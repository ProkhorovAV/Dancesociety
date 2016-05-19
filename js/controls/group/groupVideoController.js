angular.module('myApp.controllers.GroupVideo',[])
.controller('GroupVideoCtrl',['$scope','PHP_server','notify',
    function($scope,PHP_server,notify){

    // получить все видеозаписи
        $scope.getVideos = function() {
            var req = {
                action:'getvideo',
                'count': 100
            };
            PHP_server.Video(req)
                .then(function(response) {
                   // $scope.allVideos = response.data;
                    console.log(response);
                },function(err){

                });
        }
    // все видео
   $scope.allVideos=[{
       thumb:'data/user/face.jpg',
       title:'title',
       likes:10
   }];
   $scope.user={
       isMyProfile:true
   };
    // удалить видео
        $scope.removeVideo = function(video) {
            var req = {
                action:'removeVideo',
                route: 'videos',
                id: video._id
            };
            PHP_server.Video(req)
                .then(function(result) {
                    notify({
                        message: 'Видео успешно удалено',
                        classes: 'alert-success',
                        templateUrl: 'views/dialog/messages.html'
                    });
                    $scope.allVideos = _.without($scope.allVideos, video);
                }, function(err) {
                    notify({
                        message: 'Ошибка. Ищи причину в себе :)',
                        classes: 'alert-danger',
                        templateUrl: 'views/dialog/messages.html'
                    });
                });
        }

    // открыть видео
    $scope.openVideo=function(video){

    };
    // лайкнуть видео
        $scope.likeVideo = function(index) {
            var likeVideo = $scope.allVideos[index],
                req = {
                    action:'',
                    route: 'likes',
                    id: likeVideo._id,
                    fortype: 'video'
                },
                reqPromise;
            if (likeVideo.isLiked) {
                req.action='likeVideo';
                reqPromise = PHP_server.Video(req)
            } else {
                req.action='dislikeVideo';
                reqPromise = PHP_server.Video(req)
            }
            //likeVideo.isLiked = !likeVideo.isLiked;
            reqPromise
                .then(function(response) {
                    //$scope.allVideos[index].likes = response.data.likes;
                    console.log(response);
                }, function(err) {
                    console.log(err);
                    // alert(err.data);
                });

        };
        // получение группы
    function getGroup() {
        var req={
            action:'GetGroup'
        }
            PHP_server.Group(req)
            .then(function(resolve) {
                //$scope.group = resolve;
                console.log(resolve);
            });
    };

    getGroup();


}]);