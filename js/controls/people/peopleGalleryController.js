angular.module('myApp.controllers.PeopleGallery',[])
.controller('PeopleGalleryCtrl',['$scope','PHP_server','notify',
    function($scope,PHP_server,notify){
    // профайл
    $scope.user={
        isMyProfile:true
    };
    // все фото
    $scope.allPhoto=[{
        path:'data/img/bg1.jpg',
        title:'title',
        likes:11
    }];
    $scope.newPhotos=[{
        progress:true, //50
        data:{
            path:'data/user/face.jpg',
            title:'title'
        }
    }];
        // получить все картнки
        $scope.getImages = function() {
            var req = {
                action:'getAllImages',
                'first': 'photos',
                'second': 'user',
                'id': $scope.user._id,
                'count': 100
            };
            PHP_server.Images(req)
                .then(function(response) {
                    console.log(response);
                    //$scope.allPhoto = response.data;
                });
        };

    $scope.getImages();
    // удалить картинку
    $scope.removeImage=function(photo){
        // нет определения функции
    };
    // открыть фото
    $scope.openImage=function(photo,user,allphoto){
            // нет определения функции
    };
    // лайкнуть картинку
    $scope.likeImage = function(index) {
        var likeImg = $scope.allPhoto[index],
             req = {
                action:'',
                route: 'likes',
                id: likeImg._id,
                fortype: 'photo'
            },
            reqPromise;
        if (likeImg.isLiked) {
            req.action='likeImages';
            reqPromise = PHP_server.Images(req)
        } else {
            req.action='dislikeImages';
            reqPromise = PHP_server.Images(req)
        }
        //likeImg.isLiked = !likeImg.isLiked;
        reqPromise
            .then(function(response) {
                //$scope.allPhoto[index].likes = response.data.likes;
                console.log(response);
            }, function(err) {
                console.log(err);
                // alert(err.data);
            });

    };
    // загрузка картинки
    $scope.upload=function(file){

    };
    // повернуть фото
    $scope.rotatePhoto=function(photo,rotate){

    }
    // удалить картинку
    $scope.removeImage = function(photo) {
        var req = {
            action:'removePhoto',
            route: 'photos',
            id: photo._id
        };
        PHP_server.Images(req)
            .then(function(result) {
                notify({
                    message: 'Фото успешно удалена из галереи',
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
                //$scope.allPhoto = _.without($scope.allPhoto, photo);
            }, function(err) {
                notify({
                    message: 'Ошибка. Ищи причину в себе :)',
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
    }
    // удалить из массива
    $scope.removePhotoFromArray=function(photo){

    };
    // загрузить картинки (вщзможно не правильная функция)
        $scope.uploadImages = function() {
            var deferer = [];
            /*
            $scope.newPhotos.forEach(function(el) {
                console.log(el.data);
                var req = {
                    route: 'photos',
                    id: el.data._id
                };
                var reqData = {
                    title: el.data.title,
                    angle: el.data.angle,
                    description: el.data.description,
                    album: el.data.album
                }
                deferer.push(
                    RestApi.update(req, reqData).$promise
                );
            });
            */
            var req={
                action:'getAllImages'
            }
            PHP_server.Images(req).then(function(result) {
                notify({
                    message: 'Фото успешно загружены',
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
                //$scope.removeAllUploadImages();
            });
        };
    // очистить картинки загрузку
        $scope.removeAllUploadImages = function() {
            $scope.newPhotos = [];
        };

        // загрузка функций
        $scope.upload = function(files) {
            if (!files && !files.length) {
                return;
            }
            $scope.newPhotos.push.apply($scope.newPhotos, files);
            var deferer = [];
            for (var i = 0; i < files.length; ++i) {
                var file = files[i];
                deferer.push(
                    createPhotoFileUploader(file)
                );
            }
        };

        var createPhotoFileUploader = function(file) {
            return $upload.upload({
                    url: '',//$window.danceConfig.restUrlBase + '/api/photos',
                    file: file,
                })
                .progress(function(evt) {
                    var progressPercentage;
                    progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    if (progressPercentage < 10) {
                        progressPercentage = 10;
                    }
                    file.progress = progressPercentage;
                    console.log(progressPercentage);
                })
                .error(function(data) {
                    notify({
                        message: 'Ошибка. Ищи причину в себе :)',
                        classes: 'alert-danger',
                        templateUrl: 'views/dialog/messages.html'
                    });
                })
                .success(function(data) {

                    console.log(data);
                    file.progress = false;
                    file.data = data;
                })
        };


        // удалить все фото
        $scope.removePhotoFromArray = function(photo) {
            $scope.newPhotos = _.without($scope.newPhotos, photo)
        };
        // что то с фото
        $scope.rotatePhoto = function(photo, angle) {
            if (!is.propertyDefined(photo, 'angle')) {
                photo.angle = 0;
            }
            photo.angle = photo.angle + angle;
        };








    }]);