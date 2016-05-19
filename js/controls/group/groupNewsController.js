angular.module('myApp.controller.GroupNews',[])
.controller('GroupNewsCtrl',['$scope','PHP_server','$stateParams','notify','$modal',
    function($scope,PHP_server,$stateParams,notify,$modal){

    var groupId = $stateParams.id;



    var configComments = {
        'count': 3,
        'skip': 0
    }

    // главные данные
    $scope.meData={
        _id:1,
        userpic:"data/user/face.jpg"
    };
    // данные по секции
    $scope.group={
        creator:{
            _id:1
        }
    };
    // посты
    $scope.posts=[{
        groupAuthor:{
            photo:'data/img/bg1.jpg',
            name:'имя группы'
        },
        created:'12.12.2014',
        isShare:false,
        copyEntity:{
            author:{
                userpic:'data/img/bg1.jpg',
                firstname:'Sasha',
                secondname:'Prokhorov',
                _id:1
            },
            created:'12.12.2010',
            country:{
                name:'USA'
            },
            city:'USA',
            scopes:[1,2],
            dances:[1,2],
            price:12,
            startDate:"12.12.2011",
            endDate:'12.12.2019',
            startAge:10,
            endAge:20,
            startHeight:100,
            endHeight:200,
            text:'text'

        },
        _id:1,
        title:'title',
        text:'text',
        copyFromType:'',
        photos:[{
            path:'data/img/bg1.jpg'
        }],
        video:[{
            thumb:'data/img/bg1.jpg',
            title:'text',
            likes:10
        }],
        reposts:1,
        isLiked:true,
        likes:10,
        comments:{
            data:[{
                author:{
                    userpic:'data/img/bg1.jpg',
                    firstname:'sasha',
                    secondname:"Prokhorov",
                    _id:1
                },
                created:"12.12.2001",
                text:'text'
            }]
        },
        configComments:[{

        }]
    }];
    // новые теги
    $scope.newTags=[{

    }];
    // фотофайлы
    $scope.addNewsImages=[{
        path:'data/img/bg1.jpg'
    }];
    // видео файлы
    $scope.addNewsVideos=[{
        thumb:'data/img/bg1.jpg'
    }];
    // заголовок
    $scope.title='Заголовок';
    // оставить комантарии
    $scope.writingComment=function(){

    };
    //открыть картинку
    $scope.openImage=function(image){

    };
    //открыть видео
    $scope.openVideo=function(video){

    };
    // опублиовать
    $scope.newPost=function(){

    };
    // выбрать фото
    $scope.selectImage = function(maxCount) {
            /*
            if (!$scope.addNewsImages) {
                $scope.addNewsImages = [];
            }
            */
            var modalInstance = $modal.open({
                templateUrl: 'views/dialog/selectImage.html',
                controller: 'SelectImageCtrl',
                windowClass: 'select__image_window'
                /*
                resolve: {
                    MAXCOUNT: function() {
                        return maxCount;
                    },
                    alreadySelected: function() {
                        return $scope.addNewsImages;
                    }
                }
                */
            });

            modalInstance.result.then(function(selectedList) {
                $scope.addNewsImages = selectedList;
            }, function() {
                notify({
                    message: 'Вы не выбрали изображение',
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
        };

    // выбрать видео
    $scope.selectVideo = function(maxCount) {
            if (!$scope.addNewsVideos) {
                $scope.addNewsVideos = [];
            }
            var modalInstance = $modal.open({
                templateUrl: 'views/dialog/selectVideo.html',
                controller: 'SelectVideoCtrl',
                windowClass: 'select__image_window'
                /*
                resolve: {
                    MAXCOUNT: function() {
                        return maxCount;
                    },
                    alreadySelected: function() {
                        return $scope.addNewsVideos;
                    }
                    */
            });
            modalInstance.result.then(function(selectedList) {
                $scope.addNewsVideos = selectedList;
                console.log(selectedList);
            }, function() {
                notify({
                    message: 'Вы не выбрали видеозапись',
                    classes: 'alert-danger',
                    templateUrl: 'views/notify.html'
                });
            });
        };

    // удалить пост
    $scope.removePost=function(id,index){
        var req={
            action:'removePost'
        }
        PHP_server.Post(req)
            .then(function(response) {
                if (!response.data.error) {
                    //$scope.posts.splice(index, 1);
                    notify({
                        message: 'Новость успешно удалена',
                        classes: 'alert-success',
                        templateUrl: 'views/dialog/messages.html'
                    });
                } else {
                    notify({
                        message: response.data.error,
                        classes: 'alert-success',
                        templateUrl: 'views/dialog/messages.html'
                    });
                }
            });
    }
    //лайкнуть видео
    $scope.likeVideo = function(index, post) {
        var likeVideo = post.videos[index],
            req = {
                action:'',
                route: 'likes',
                id: likeVideo._id,
                fortype: 'video'
            },
            reqPromise;
        if (likeVideo.isLiked) {
            req.action='likeVideo';
            reqPromise = PHP_server.Likes(req);
        } else {
            req.action='dislikeVideo';
            reqPromise = PHP_server.Likes(req);
        }
        //likeVideo.isLiked = !likeVideo.isLiked;
        reqPromise
            .then(function(response) {
               // post.videos[index].likes = response.data.likes;
                console.log(response);
            }, function(err) {
                console.log(err);
                // alert(err.data);
            });

    };


    // поделиться новостью
    $scope.sharePost=function(post){

        var req = {
            action:'shatePost',
            title: post.title,
            route: 'posts',
            copyFromId: post._id,
            copyFromType: 'post'
        };

        PHP_server.Post(req)
            .then(function(resolve) {
                notify({
                    message: 'Эта новость появится на Вашей странице.',
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
                //post.reposts++;
            }, function(err) {
                notify({
                    message: 'Ошибка. Мы уже знаем о ней.',
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
    };
    //лайкнуть пост
    $scope.likePost = function(index) {
        var post = $scope.posts[index],
            req = {
                action:''
                //route: 'likes',
                //id: post._id,
                //fortype: 'post'
            },
            reqPromise;
        if (post.isLiked) {
            req.action='likePost';
            reqPromise = PHP_server.Likes(req);
        } else {
            req.action='dislikePost';
            reqPromise = PHP_server.Likes(req);
        }
        //post.isLiked = !post.isLiked;
        reqPromise
            .then(function(response) {
                //$scope.posts[index].likes = response.data.likes;
                console.log(response);
            }, function(err) {
                console.log(err);
                // alert(err.data);
            });

    };
    // все коментарии
    $scope.showAllComments=function(post){

    };
    // удалиь комантарий
        $scope.removeComment = function(commentId, index, postIndex) {
            var req ={
                action:'deleteComment'
            }
            PHP_server.Comment()
                .then(function(response) {
                    if (!response.data.error) {
                        //$scope.posts[postIndex].comments.data.splice(index, 1);
                        // getSinglePost($scope.posts[postIndex]._id, function(data) {
                        //     $scope.posts[postIndex] = data;
                        // });
                        console.log(response);
                    }
                },function(err){
                    console.log('Ошибка удаления комантария'+err);
                });
        };
    //новый комантарий
    $scope.newComment=function(index){
        console.log(index);
        var req = {
            action:'newComment',
            //text: $scope.newComment[index].text,
            //forwho: $scope.posts[index]._id
        };
        PHP_server.Comment(req)
            .then(function(response) {
                console.log(response.data);
                /*
                if (response.status === 200) {
                    $scope.posts[index].comments.data.push(response.data);
                } else {
                    alert(response.data.error);
                }
                    */
                //$scope.newComment[index].text = '';
            },function(err){
                console.log(err);
            });



    }
    // получить данные о группе
    function getGroup() {
        var req={
            action:'GetGrouponId',
            id:1
        };
        //PHP_server.Group($stateParams.id)
        PHP_server.Group(req)
            .then(function(resolve) {
                // вывод по значению
                console.log($stateParams.id);
                //$scope.group = resolve;
                console.log(resolve);
            },function(err){
                console.log(err);
            });
    };

    getGroup();

        // получение коментариев через функцию getAllPosts

        $scope.getComments = function(post) {
            var req = {
                first: 'comments',
                second: 'post',
                id: post._id,
                skip: post.configComments.skip,
                count: post.configComments.count
            };
            RestApi.getObject(req).$promise
                .then(function(data) {
                    data.data.data = data.data.data.reverse();
                    post.comments = data.data;
                });
        };

        //  получить все новости
        var getAllPosts = function() {
            var req = {
                action:'shatAllPostGroup',
                first: 'posts',
                second: 'group'
            };

            PHP_server.Post(req)
                .then(function(response) {
                    console.log(response);
                    //$scope.posts = response.data;
                    //console.log(response.data);
                    /*
                    $scope.posts.forEach(function(el, id) {
                        el.configComments = angular.copy(configComments);
                        if(el.copyFromType == 'post') {
                            el.isShare = true;
                            el.photos = el.copyEntity.photos;
                            el.title = el.copyEntity.title;
                            el.text = el.copyEntity.text;
                            el.videos = el.copyEntity.videos;
                        }
                        if(el.copyFromType == 'vacancy') {
                            el.isShare = true;
                            el.title = el.copyEntity.title;
                            el.text = el.copyEntity.text;
                            el.copyEntity.dances.map(function(el2, index) {
                                el.copyEntity.dances[index] = el2.name;
                                return el2;
                            });
                        }
                        $scope.getComments(el);

                    });
                    */
                },function(err){
                    console.log(err);
                });
        };



        getAllPosts();
        // написать коментарий
        $scope.writingComment = function() {
          // var re = /(#[a-z0-9а-я][a-z0-9а-я\-_]*)/g;
           // $scope.newTags = $scope.text.match(re);
        }
        // показать все коментарии
        $scope.showAllComments = function(post) {
            post.configComments.count = post.comments.count;
            $scope.getComments(post);
        }
            // новая новость
        $scope.newPost = function() {
            if (!$scope.addNewsImages) {
                $scope.addNewsImages = [];
            } else {
                $scope.addNewsImages.map(function(el) {
                    return el._id;
                });
            }

            if (!$scope.addNewsVideos) {
                $scope.addNewsVideos = [];
            } else {
                $scope.addNewsVideos.map(function(el) {
                    return el._id;
                });
            }

            var req = {
                action:'newPost',
                title: $scope.title,
                text: $scope.text,
                photos: $scope.addNewsImages,
                videos: $scope.addNewsVideos,
                route: 'posts',
                groupAuthor: $scope.group._id
            };
            var saveNewPost = PHP_server.Post(req);
            saveNewPost.then(function(value) {
                console.log(value);
                // $scope.posts.unshift(value.data)
                notify({
                    message: 'Ваша новость успешно добавлена.',
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
                $scope.title = '';
                $scope.text = '';
                $scope.addNewsImages = [];
                $scope.addNewsVideos = [];
            }, function(value) {
                notify({
                    message: 'Ошибка. Заполни все поля.',
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
        };



}]);