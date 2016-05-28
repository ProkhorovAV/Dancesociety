angular.module("myApp.controllers.News", [])
    .controller("NewsCtrl", [
        "$scope",'user_dataService','PHP_server','notify','ErrorService',
        function ($scope,user_dataService,PHP_server,notify,ErrorService ) {


            // пользователь который вошел в систему
            $scope.meData={
                _id:1,
                userpic:'data/user/face.jpg'
            };

            // параметры мои подписки
            $scope.reqParams= {
                postSubscribers: 0,
                videos:0,
                videosTopUsers:0
            };
            //! видео новости мои
            $scope.postSubscribers=[{
                // видео простое
                /*
                author:{
                    _id:1,
                    name:"Александр",
                    secondname:"Прохоров",
                    firstname:"Владимирович",
                    created:'12.12/2011'
                },
                title:"классная новость",
                photos:[
                    'img/bg1.jpg',
                    'img/bg2.jpg'
                ],
                videos:[{
                    thumb:'img/bg2.jpg',
                    title:'Класс видео',
                    likes:10

                }],
                reposts:1,
                isLiked:true,
                likes:1,
                comments:{
                    data:[{
                        author:{
                            face:'img/bg2.jpg',
                            firstname:"Александр",
                            secondname:'Прохоров',
                            _id:1
                        },
                        created:'12.12.2015'
                    }

                    ]
                }
                */

            }];
            //! функция получения видео мои подписчики
            $scope.getVideosSubscribers=function(options){
                var params={
                    'counts': 6,
                    'skip': $scope.reqParams.postSubscribers,
                    'action':'getPostDataCountsIdUser',
                    data:{
                        idPeople:user_dataService.getId()
                    }
                };
                this.config = $.extend({}, params, options);
                return PHP_server.Post(this.config);
            };
            //! получение видео от пользователей
            $scope.getVideosSubscribers()
                 .then(function(response){
                     // если ошибка передача ошибки
                    if (JSON.parse(response.data.error)){
                        ErrorService.error(response.data)
                    }else{
                        // весение данных
                    $scope.postSubscribers=response.data.data;

                    }
                 },function(err) {
                     console.log('Ошибка в получении жданных');
                     console.log(err);
             });

            //!  новости топ user
            $scope.postsTopUsers=[
                /*{
                    posts:[{
                        groupAuthor:{
                            _id:1,
                            photo:'data/user/face.jpg',
                            name:'Группа 1'
                        },
                        author:{
                            userpic:'img/bg2.jpg',
                            firstname:'Саша',
                            secondname:'Прохоров'
                        },
                        created:'12.12.2013',
                        title:'Супер пупер',
                        text:'просто текст',
                        photos:[
                            'img/bg3.jpg'
                        ],
                        video:[{
                            thumb:'img/bg4.jpg',
                            title:'Видео 1',
                            likes:10
                        }],
                        reposts:'Репост',
                        isLiked:23,
                        comments:{
                            data:[{
                                author:{
                                    userpic:'data/img/bg1.jpg',
                                    firstname:'Саша',
                                    secondname:"Прохоров",
                                    _id:1

                                },
                                created:"12.02.12",
                                text:"Просто текст"

                            }]

                        }

                }],
                    userpic:'img/bg1.jpg',
                    firstname:"Имя",
                    secondname:'Фамилия',
                    subscribersCount:10,
                    isFollowing:true,
                    _id:1

                }*/
            ];

            //! функция получение новостей в топ сортировка по лайкам
            $scope.getTopUsersPosts=function(options){
                var params={
                    'counts': 6,
                    'skip': $scope.reqParams.videosTopUsers,
                    'action':'getPostFromTopUser'
                };
                this.config = $.extend({}, params, options);
                return PHP_server.Post(this.config);
            };
            //! получение новости
            $scope.getTopUsersPosts()

             .then(function(response){
                 // если ошибка передачи
                 if (JSON.parse(response.data.error)){
                     ErrorService.error(response.data)
                 }else{
                     // весение данных
                     $scope.postsTopUsers=response.data.data;
                        console.log(response.data);
                 }

             },function(err) {
                 console.log('Ошибка в получении жданных');
                 console.log(err);
             });


            //! новости danciety
            $scope.postDanciety=[{
                /*
                data:[{
                    groupAuthor:{
                        _id:1,
                        photo:'data/img/bg1.jpg'
                    },
                    author:{
                        userpic:'data/user/face.jpg',
                        firstname:'Саша',
                        secondname:"Прохоров"
                    },
                    created:'12.12.2012',
                    title:'Название 1',
                    text:"Просто текст",
                    photos:[{
                        path:'data/img/bg1.jpg'
                    }],
                    videos:[{
                        thumb:'data/img/bg1.jpg',
                        likes:10

                    }],
                    reposts:3,
                    isLiked:true,
                    likes:10,
                    comments:{
                        data:[{
                            author:{
                                userpic:'data/img/bg1.jpg',
                                firstname:'Саша',
                                secondname:'Прохоров',
                                _id:1
                            },
                            created:'12.12.2019',
                            text:'обычный текст'
                        }]
                    }
                }]
                */
            }];

            //! получить видео новости
            $scope.getpostDanciety = function(options) {                                                                                 // функция запроса к серверу
                var params={
                    'counts': 6,
                    'skip': $scope.reqParams.videos,
                    'action':'getPostFromDanciety'
                };
                this.config = $.extend({}, params, options);
                return PHP_server.Video(this.config);
            };

            //! функция видео новости
            $scope.getpostDanciety()
            // получение видео
                 .then(function(response) {
                 $scope.postDanciety=response.data.data;
                 }, function(err) {
                 console.log('Ошибка в получении жданных');
                 console.log(err);
             });




                // кнопка удаления
            $scope.removePost=function(id_user,index){

            };
                // открытие странички
            $scope.openImage=function(img){

            };
                //открытие видео
            $scope.openVideo=function(video){

            };
                // лайкнуть видео
            $scope.likeVideo=function(index, post){

            };
                // кнопка вызывает поделиться постом
            $scope.sharePost=function(post){

                var req = {
                    action:'SetPublicPost'
                    //title: post.title,
                    //route: 'posts',
                    //copyFromId: post._id,
                    //copyFromType: 'post'
                };
                PHP_server.Save(req)
                    .then(function(resolve) {
                        // условие переделать в соответсвтии с запросом
                        console.log(resolve);
                        if(resolve.data) {
                            notify({
                                message: 'Эта новость появится на Вашей странице.',
                                classes: 'alert-success',
                                templateUrl: 'views/dialog/messages.html'
                            });
                            post.reposts++;
                        }else{
                            notify({
                                message: 'Ошибка. Мы уже знаем о ней.',
                                classes: 'alert-danger',
                                templateUrl: 'views/dialog/messages.html'
                            });
                        }
                    }, function(err) {
                       console.log('Ошибка отправки данных'+err);
                    });



            };

                // удаление коментария
            $scope.removeComment=function(id, index, post){

            };
                // показать больше видео
            $scope.nextSubscribersVideosPage=function(){
                $scope.reqParams.videosSubscribers++;
                $scope.getVideosSubscribers({skip: $scope.reqParams.videosSubscribers})
                    .then(function(response){
                        $scope.videosSubscribers=response.data;
                        console.log(response);
                    },function(err) {
                        console.log('Ошибка в получении данных при клике на next');
                        console.log(err);
                    });
            };
                // подписаться к этому пользователю
            $scope.subscribeToUser=function(action,user){
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
                // открыть картинку
            $scope.openImage=function(image){

            };

                //лайкнуть пост в трех секциях
            $scope.likePost=function(posts){

                var post = posts,
                    req = {
                        action:'likePost'
                    },
                    reqPromise;
                if (post.isLiked) {
                    reqPromise = PHP_server.Delete(req);
                } else {
                    reqPromise = PHP_server.Save(req);
                }
                posts.isLiked = !posts.isLiked;

                reqPromise
                    .then(function(response) {
                        //post.likes = response.data.likes;
                        console.log(response);
                    }, function(err) {
                        console.log(err);
                        // alert(err.data);
                    });
            };

                // удалить коментарий
            $scope.removeComment=function(id,index,post){
                var res={
                    action: 'deleteComment'
                };
                PHP_server.Delete(res).then(function(response) {

                            console.log(post);
                            //post.comments.data.splice(index, 1);
                                // getSinglePost($scope.posts[postIndex]._id, function(data) {
                                //     $scope.posts[postIndex] = data;
                                // });

                    },function(err) {
                    console.log('Ошибка в получении данных при клике на удалить');
                    console.log(err);
                });
            };

                //добавить новый коментарий в трех страницах
            $scope.newComment=function(index,post){
                    // добавить post какой кликнул
                var req = {
                    action:'SetComment',
                    // переменная в html
                    //text: $scope.newComment[index].text

                };
                PHP_server.Save(req)
                    .then(function(response) {
                        if (response.status === 200) {
                            console.log('комент добавлен');
                           // post.comments.data.push(response.data);
                        } else {
                            //alert(response.data.error);
                            console.log('Ошибка внесения комментария');
                        }
                            // обновить текст комментария
                       //$scope.newComment[index].text = '';
                    });

            };
                //показать больше видео на странице
            $scope.nextVideosPage=function(){
                $scope.reqParams.videos++;
                $scope.getVideos({skip: $scope.reqParams.videos})
                    .then(function(response){
                        $scope.videos=response.data;
                        console.log(response);
                    },function(err) {
                        console.log('Ошибка в получении данных при клике на next');
                        console.log(err);
                    });
            };





        }
    ]);

