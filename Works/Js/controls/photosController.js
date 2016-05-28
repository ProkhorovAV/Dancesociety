angular.module("myApp.controllers.Photos", [])
    .controller("PhotosCtrl", [
        "$scope",'PHP_server',
        function ($scope,PHP_server) {



            //! массив фотографий
            $scope.photosAll=[
                /*{
                path:'data/img/bg1.jpg',
                title:'описание картинки',
                likes:10,
                isLiked:true

            }
            */];

            //!  функция получения всех фотографий
            $scope.getPhotos = function(options) {
                var params = {
                    action:'getAllPhoto'
                }
                this.config = $.extend({}, params, options);
                return PHP_server.Photo(this.config);
            };
            //! получение фото
            $scope.getPhotos()
                .then(function(response){

                    // если ошибка передачи
                    if (JSON.parse(response.data.error)){
                        ErrorService.error(response.data)
                    }else{
                        // весение данных
                        $scope.photosAll=response.data.data;
                    }
                },function(err) {
                    console.log('Ошибка в получении жданных');
                    console.log(err);
                });







            // сортировка
            $scope.sort = 'popular';
            //  параметры для фото
            $scope.getParams = {
                'count': 20,
                'skip': 0,
                'currentPage': 1
            };

            $scope.loadingPage = false;
            /* параметр, который разрешает загружаться элементам при infinity scroll.
             Если у него значение false, то у нас итемы не подгружаются, и можно дальше
             подгружать.*/


            // панель поиска
            $scope.searchPanel=true;







            // кнопка сортировки работет с sort
            $scope.changeSortType=function(){

            };

                // открыть картинку
            $scope.openImage=function(photo, meData, photos){

            };
                // лайкнуть или не лайкнуть фото
            $scope.likePhoto = function(index) {
                var likePhoto = $scope.photos[index],
                    req = {
                        action:''
                        //route: 'likes',
                        //id: likePhoto._id,
                        //fortype: 'photo'
                    },
                    reqPromise;
                if (likePhoto.isLiked) {
                    req.action='LikePhoto';
                    reqPromise = PHP_server.Likes(req)
                } else {
                    req.action='disLikePhoto';
                    reqPromise = PHP_server.Likes(req)
                }
                //likePhoto.isLiked = !likePhoto.isLiked;
                reqPromise
                    .then(function(response) {
                        //$scope.photos[index].likes = response.data.likes;
                        console.log(response);
                    }, function(err) {
                        console.log('Ошибка получения данных по лайку'+err);

                    });

            };

                // смена странички возможно перелистывание фотографий
                // продумать насчет передачи параметров
            $scope.changePage = function() {
               //$scope.getParams.skip = ($scope.getParams.currentPage - 1) * $scope.getParams.count;
                //$scope.getPhotos($scope.getParams.count, $scope.getParams.skip)
            }
                // смена типа сортировки фотографий
                // подумать о передаче параметров
            $scope.changeSortType = function() {
                $scope.getParams = {
                    'count': 20,
                    'skip': 0,
                    'currentPage': 1
                };
                $scope.getPhotos()
                    .then(function(resolve) {
                        //$scope.photos = resolve.data;
                        //$scope.loadingPage = false;
                        console.log(resolve.data);
                    }, function(err) {
                        console.log(err);
                    });
            }
            // инициализация странички
            $scope.myPagingFunction = function() {
                /*
                if (!$scope.loadingPage) {
                    $scope.loadingPage = true;
                    $scope.getParams.currentPage++;
                    $scope.getParams.skip = ($scope.getParams.currentPage - 1) * $scope.getParams.count;
                    $scope.getPhotos($scope.getParams.count, $scope.getParams.skip)
                        .then(function(resolve) {
                            console.log(resolve);
                            $scope.photos = $scope.photos.concat(resolve.data);
                            if (resolve.data.length == 0) {
                                $scope.loadingPage = true;
                            } else {
                                $scope.loadingPage = false;
                            }
                            console.log($scope.photos);
                        });
                }
                */
            }






        }
    ]);
