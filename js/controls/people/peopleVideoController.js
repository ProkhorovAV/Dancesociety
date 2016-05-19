angular.module('myApp.controllers.PeopleVideo',[])
.controller('PeopleVideoCtrl',['$scope','PHP_server','notify',
    function($scope,PHP_server,notify){


        if (!$scope.newVideo) {
            $scope.newVideo = {};
        }


        $scope.user={
        isMyProfile:true
    };
    // инициализация
    $scope.getVideos = function() {
        var req = {
            action:'getvideo',
            'first': 'videos',
            'second': 'user',
            'id': $scope.user._id
        }
        PHP_server.Video(req)
            .then(function(resolve) {
                console.log(resolve.data);
                //$scope.allVideos = resolve.data;
            })
            .then(function(err) {
                console.log(err);
            });
    }
    // все видео
    $scope.allVideos=[{
        thumb:'data/img/bg1.jpg',
        title:'title',
        likes:12
    }];
    // удалиь видео
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
                //$scope.allVideos = _.without($scope.allVideos, video);
            }, function(err) {
                notify({
                    message: 'Ошибка. Ищи причину в себе :)',
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
    }
    // открыть видео
    $scope.openVideo=function(){
      //  нет определения функции
    };
    // изменить файл
    $scope.changeVideoField = function(el) {
        console.log(el);
        if (!el) return false;
        console.log(el);
        if (el[0] !== 'h') {
            el = 'http://' + el;
        }
        console.log(el);
        $scope.newVideoYoutube = el;
    }
    //  ссылка на ютуб
    $scope.newVideo={
        url:''
    };
    $scope.newVideoForm={
        url:''
    };
    // загрузка видео
    $scope.uploadVideo = function() {
        if (!$scope.newVideoYoutube) {
            notify({
                message: 'Введите правильную ссылку на видео!',
                classes: 'alert-danger',
                templateUrl: 'views/dialog/messages.html'
            });
            return false;
        }
        var req = {
            action:'uploadVideo',
            'route': 'videos'
        }
        var data = {
            'link': $scope.newVideoYoutube
        }
        PHP_server.Video(req)  //data
            .then(function(resolve) {
                console.log(resolve);
                //$scope.allVideos.push(resolve.data);
                //$scope.resetUploadVideo();
                //$scope.tabs[0].active = true;
            })
            .then(function(err) {
                console.log(err);
            });
    }
    // очистить строчки видео
    $scope.resetUploadVideo = function() {
        $scope.newVideoYoutube = '';
        $scope.newVideo.url = '';
    }
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

}]);