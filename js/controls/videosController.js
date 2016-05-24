angular.module("myApp.controllers.Videos", [])
    .controller("VideosCtrl", [
        "$scope",'PHP_server','notify',
        function ($scope,PHP_server,notify) {

            //! перечень видео по id user
            $scope.videosSubscribers=[
                /*{
                data:[{
                    thumb:'data/img/bg1.jpg',
                    title:'Заголовок видео',
                    likes:10,
                    author:{
                        firstname:'Sasha',
                        secondname:'Prokhorov',
                        subscribersCount:10
                    }
                }]

            }

            */];
            //! функция получения видео
            $scope.getVideosSubscribers=function(options){
                var params={
                    'counts': 6,
                    'skip': 0,
                    'action':'getVideoOnIdUser'
                };
                this.config = $.extend({}, params, options);
                return PHP_server.Video(this.config);
            };

            //! получение моих видео
             $scope.getVideosSubscribers()
                 .then(function(response){
                     // если ошибка передачи
                     if (JSON.parse(response.data.error)){
                         ErrorService.error(response.data)
                     }else{
                         // весение данных
                         $scope.videosSubscribers=response.data.data;
                     }
                 },function(err) {
                     console.log('Ошибка в получении жданных');
                     console.log(err);
                 });

            //! лушее от  топ пользователей
            $scope.videosTopUsers=[{
                userpic:'data/img/face.jpg',
                firstname:'Sasha',
                secondname:'Prokhorov',
                subscribersCount:10,
                isFollowing:true,
                _id:1,
                video:[{
                    thumb:'data/img/bg1.jpg',
                    title:'Видео',
                    likes:1,
                    data:[{
                        thumb:'data/img/bg1.jpg',
                        title:'Видео',
                        likes:1,
                        count:1
                    }]
                }]

            }];

            //функция получение видео от зрителей
            $scope.getTopUsersVideos=function(options){
                var params={
                    'counts': 6,
                    'skip': 0,
                    'action':'getVideoOnTopUser'
                };
                this.config = $.extend({}, params, options);
                return PHP_server.Video(this.config);
            };

            //! получение видео от топ пользователей
             $scope.getTopUsersVideos()
                 .then(function(response){
                     // если ошибка передачи
                     if (JSON.parse(response.data.error)){
                         ErrorService.error(response.data)
                     }else{
                         // весение данных
                         $scope.videosTopUsers=response.data.data;

                     }
                 },function(err) {
                     console.log('Ошибка в получении жданных');
                     console.log(err);
                 });

            // все видео Danciety
            $scope.videosDanciety=[];

            // получить видео новости
            $scope.getVideosDanciety = function(options) {                                                                                 // функция запроса к серверу
                var params={
                    'counts': 6,
                    'skip': 0,
                    'action':'getVideosDanciety'
                };
                this.config = $.extend({}, params, options);
                return PHP_server.Video(this.config);
            };
            // функция видео новости

             $scope.getVideosDanciety()                                                                                              // получение видео
                 .then(function(response){

                     // если ошибка передачи
                     if (JSON.parse(response.data.error)){
                         ErrorService.error(response.data)
                     }else{
                         // весение данных
                         $scope.videosDanciety=response.data.data;
                     }
                 },function(err) {
                     console.log('Ошибка в получении жданных');
                     console.log(err);
                 });













            $scope.sort = 'date';
/*
            $scope.reqParams = {
                video:{
                    'count': 6,
                    'skip': 0
                },
                videosSubscribers:{
                    'count': 6,
                    'skip': 0
                }
            };
            */




            // всего видео
           // $scope.videosSubscribers=1;
            // открыть видео
            $scope.openVideo=function(video){

            };




            //лайкнуть видео
            $scope.likeVideo = function(index, video) {
                var likeVideo = video,
                    req = {
                        action:'',
                        route: 'likes',
                       // id: likeVideo._id,
                        fortype: 'video'
                    },
                    reqPromise;
                if (likeVideo.isLiked) {
                    req.action='likeVideo';
                    reqPromise = PHP_server.Likes(req)
                } else {
                    req.action='dislikeVideo';
                    reqPromise = PHP_server.Likes(req)
                }
                // likeVideo.isLiked = !likeVideo.isLiked;
                reqPromise
                    .then(function(response) {
                        console.log('лайк видео');
                        //likeVideo.likes = response.data.likes;

                    }, function(err) {

                    });

            };
            // следующее часть видео
            $scope.nextSubscribersVideosPage = function() {
                // $scope.reqParams.videosSubscribers.count += $scope.reqParams.videosSubscribers.count;
                //$scope.reqParams.videosSubscribers.skip += $scope.reqParams.videosSubscribers.count;
                $scope.getSubscribersVideos()
                    .then(function(resolve) {
                        console.log(response);
                        //$scope.videosSubscribers.count = resolve.count;
                        //$scope.videosSubscribers.data = $scope.videosSubscribers.data.concat(resolve.data);
                    }, function(err) {
                        console.log('Ошибка в получении данных');
                        console.log(err);
                    });
            };

            // подписаться к этому пользователю
            $scope.subscribeToUser=function(user,action){
                var successMessage, send;
                // переключение на отписку и подписку
                user.isFollowing=!user.isFollowing;
                switch (action){
                    case 'subscribe':
                        send = PHP_server.Subscribe({action:action});
                        successMessage = 'Вы успешно подписались на пользователя';
                        break;
                    case 'unsubscribe':
                        send = PHP_server.Subscribe({action:action});
                        successMessage = 'Вы успешно отписались от пользователя';
                        break;
                }
                send.then(function(result) {
                    //user.isFollowing = !user.isFollowing;
                    notify({
                        message: successMessage,
                        classes: 'alert-success',
                        templateUrl: 'views/dialog/messages.html'
                    });
                }, function(err) {
                    notify({
                        message: err.data.message,
                        classes: 'alert-danger',
                        templateUrl: 'views/dialog/messages.html'
                    });
                });

            };


            // удалить видео
            $scope.removeVideo=function(video){

            };




            //показать больше видео на странице
            $scope.nextVideosPage=function(){
                //$scope.reqParams.videos++;

                /*
                $scope.getVideos({skip: $scope.reqParams.videos})
                    .then(function(response){
                        $scope.videos=response.data;
                        console.log(response);
                    },function(err) {
                        console.log('Ошибка в получении данных при клике на next');
                        console.log(err);
                    });
                */
            };




        }
    ]);
