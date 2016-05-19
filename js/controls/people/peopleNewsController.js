angular.module('myApp.controllers.PeopleNews',[])
.controller('PeopleNewsCtrl',['$scope','PHP_server','notify','$modal',
    function($scope,PHP_server,notify,$modal){

        var configComments = {
            'count': 3,
            'skip': 0
        }


        $scope.meData={
        _id:1,
        userpic:'data/user/face.jpg'
    };
    // юзер
    $scope.user={
        isMyProfile:true
    };
    $scope.title='заголовок';
    //написать комантарий
        $scope.writingComment = function() {
           // var re = /(#[a-z0-9а-я][a-z0-9а-я\-_]*)/g;
           // $scope.newTags = $scope.text.match(re);
            //console.log($scope.newTags);
        }
    // добавить новую картинку
    $scope.addNewsImages=[{
        path:'data/img/bg1.jpg'
    }];
    // открыть картинку
    $scope.openImage=function(img){

    };
    // видео все
    $scope.addNewsVideos=[{
        thumb:'data/img/bg1.jpg'
    }];
    // открыть видео

    // выбрать картинку
        $scope.selectImage = function(maxCount) {
            if (!$scope.addNewsImages) {
                $scope.addNewsImages = [];
            }
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
                //$scope.addNewsImages = selectedList;
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
                }
                */
            });

            modalInstance.result.then(function(selectedList) {
                //$scope.addNewsVideos = selectedList;
                console.log(selectedList);
            }, function() {
                notify({
                    message: 'Вы не выбрали видеозапись',
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
        };
    // теги пустые
    $scope.newTags=[{

    }];
    // посты
    $scope.posts=[{
        author:{
            userpic:'data/user/face.jpg',
            firstname:'Sasha',
            secondname:'Prokhorov',
            _id:1
        },
        created:'12.12.2000',
        isShare:true,
        copyEntity:{
            author:{
                userpic:'data/user/face.jpg',
                firstname:'Sasha',
                secondname:'Prokhorov'
                },
            created:'12.12.2006',
            country:{
                name:'USA'
            },
            city:'USA',
            scopes:[1,2,3],
            dances:[1,2,3],
            price:123,
            startDate:'12.12.2009',
            endDate:'12.12.2000',
            startAge:12,
            endAge:23,
            startHeight:123,
            endHeight:123,
            text:'text'
        },
        title:'title',
        text:'text',
        copyFromType:'',
        photos:[{
            path:'data/img/bg1.jpg'
        }],
        videos:[{
            thumb:'data/img/bg1.jpg',
            title:'название',
            likes:1
        }],
        reposts:11,
        isLiked:true,
        likes:12,
        comments:{
            data:[{
                author:{
                    userpic:'data/user/face.jpg',
                    firstname:'Sasha',
                    secondname:"Prokhorov",
                    _id:1
                },
                created:"12.12.2009",
                text:'text'

            }]
        },
        configComments:[{

        }]


    }];
    // удалить пост
    $scope.removePost = function(postId, index) {
        var req ={
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
            },function(err){
                console.log(err);
            });
    };
    // открыть картинку
    $scope.openImage=function(images){

    };
    // открыть видео
    $scope.openVideo=function(video){

    };
    // лайкнуть видео
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
                reqPromise = PHP_server.Video(req)
            } else {
                req.action='dislikeVideo';
                reqPromise = PHP_server.Video(req)
            }
            //likeVideo.isLiked = !likeVideo.isLiked;
            reqPromise
                .then(function(response) {
                    //post.videos[index].likes = response.data.likes;
                    console.log(response);
                }, function(err) {
                    console.log(err);
                    // alert(err.data);
                });

        };

    //поделиться
    $scope.sharePost=function(post){

    };
    // лайкнуть новость
        $scope.likePost = function(index) {
            var post = $scope.posts[index],
                req = {
                    action:'',
                    route: 'likes',
                    id: post._id,
                    fortype: 'post'
                },
                reqPromise;
            if (post.isLiked) {
                req.action='likePost';
                reqPromise = PHP_server.Post(req)
            } else {
                req.action='dislikePost';
                reqPromise = PHP_server.Post(req)
            }
            //post.isLiked = !post.isLiked;
            reqPromise
                .then(function(response) {
                    //$scope.posts[index].likes = response.data.likes;
                    console.log(response);
                }, function(err) {
                    console.log(response);
                    // alert(err.data);
                });

        };
    // открыть все коментарии
        $scope.showAllComments = function(post) {
            //post.configComments.count = post.comments.count;
            //$scope.getComments(post);
        }
    // удалить коментарий
        $scope.removeComment = function(commentId, index, postIndex) {
            var req={
                action:'removeComment'
            }
            PHP_server.Comment(req)
                .then(function(response) {
                    if (!response.data.error) {
                        //$scope.posts[postIndex].comments.data.splice(index, 1);
                        // getSinglePost($scope.posts[postIndex]._id, function(data) {
                        //     $scope.posts[postIndex] = data;
                        // });
                    }
                });
        };
    // добавить комантарий
        $scope.newComment = function(index) {

            var req = {
                action:'addComment',
                text: $scope.newComment[index].text,
                forwho: $scope.posts[index]._id
            };
            PHP_server.Comment(req)
                .then(function(response) {
                    console.log(response.data);
                    if (response.status === 200) {
                        //$scope.posts[index].comments.data.push(response.data);
                    } else {
                       // alert(response.data.error);
                    }

                    //$scope.newComment[index].text = '';
                });
        }

        // новая новость
        $scope.newPost = function() {
            /*
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
                title: $scope.title,
                text: $scope.text,
                photos: $scope.addNewsImages,
                videos: $scope.addNewsVideos,
                route: 'posts'
            };
            */
            var req={
                action:"newPost"
            }
            PHP_server.Post(req)
                .then(function(value) {
                console.log(value);
                //$scope.posts.unshift(value.data)
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
        // получить комментарии
        $scope.getComments = function(post) {
            var req = {
                action:'getComment',
                //first: 'comments',
                //second: 'post',
                //id: post._id,
                //skip: post.configComments.skip,
                //count: post.configComments.count
            };
            PHP_server.Comment(req)
                .then(function(data) {
                    //data.data.data = data.data.data.reverse();
                    //post.comments = data.data;
                    console.log(data);
                },function(err){
                    console.log(err);
                });
        };
        // функция тупит
       // getComments();

        // опубликовать новость
        $scope.sharePost = function(post) {

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
        }


        var getAllPosts = function() {
            /*
            var req = {
                first: 'posts',
                second: 'user'
            };
            if ($stateParams.id) {
                req.id = $stateParams.id;
            } else {
                delete req.id;
            }
*/
            var req={
                action:'getAllPost'
            }
            PHP_server.Post(req)
                .then(function(response) {
                    //$scope.posts = response.data;
                    console.log(response.data);
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
                });
        };



        getAllPosts();


















}]);