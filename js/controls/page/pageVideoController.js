angular.module('myApp.controllers.PageVideo',[])
.controller('PageVideoCtrl',['$scope','PHP_server','notify',
    function($scope,PHP_server,notify){

        // все видео
        $scope.allVideos=[
            /*{
            thumb:'data/user/face.jpg',
            title:'title',
            likes:10
        }
        */];


        //! получения фидео
        $scope.getPhotoPublicPageOnId=function(){
            var req={
                action:"getVideoPublicPageOnId",
                data:{
                    idPage:$stateParams.id
                }
            };
            return PHP_server.Video(req);
        };
        //! получение новостей от группы
        $scope.getPhotoPublicPageOnId()
            .then(function(response){
                console.log(response);
                return;
                // если ошибка передачи
                if (JSON.parse(response.data.error)){
                    ErrorService.error(response.data)
                }else{
                    // весение данных
                    $scope.allVideos=response.data.data;

                }
            },function(err) {
                console.log('Ошибка в получении жданных');
                console.log(err);
            });
















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



}]);