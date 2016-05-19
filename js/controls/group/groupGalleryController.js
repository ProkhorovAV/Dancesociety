angular.module('myApp.controllers.GroupGallery',[])
.controller('GroupGalleryCtrl',['$scope','PHP_server','notify','$stateParams',
    function($scope,PHP_server,notify,$stateParams){

    // идентификатор группы
    var groupId = $stateParams.id;
    // новые фотографии
    $scope.newPhotos = [];

    // главная
    $scope.meData={
        _id:1
    };
    // группа
    $scope.group={
        creator:{
            _id:1
        }
    };
    // юзер
    $scope.user={
        isMyProfile:true
    };

    // все фотограции
    $scope.allPhoto=[{
        path:'data/user/face.jpg',
        title:'Заголовок',
        likes:10

    }];

    // получить все фотографии
    $scope.getImages = function() {
        var req = {
            action:'getPhoto'
            //'count': 100
        };
        PHP_server.Photo(req)
            .then(function(response) {
                //$scope.allPhoto = response.data;
                console.log(response);
            },function(err){
                console.log(err);
            });
    };

    $scope.getImages();
    // выбор картинок
    $scope.selectImage = function(maxCount, type) {
        var modalInstance = $modal.open({
            templateUrl: 'views/dialog/selectImage.html',
            controller: 'SelectImageCtrl',
            windowClass: 'select__image_window',
            /*
            resolve: {
                MAXCOUNT: function() {
                    return maxCount;
                },
                alreadySelected: function() {
                    return false;
                }
            }
            */
        });

        modalInstance.result.then(function(selectedList) {

            //var newImages = [];
            var newImages = {
                photos: []
            }
            selectedList.map(function(item) {
                newImages.photos.push(item._id);
            });
            PHP_server.Images( newImages)
                .then(function(resolve) {
                    console.log(resolve);
                    //$scope.allPhoto = $scope.allPhoto.concat(selectedList);
                }, function(err) {
                    console.log(err);
                })
        }, function() {
            notify({
                message: 'Вы не выбрали изображение',
                classes: 'alert-danger',
                templateUrl: 'views/dialog/messages.html'
            });
        });
    };
    // удалить картинку
    $scope.removeImage = function(photo) {
        var req = {
            action:'removePhoto',
            route: 'photos',
            id: photo._id
        };
        PHP_server.Photo(req)
            .then(function(result) {
                notify({
                    message: 'Фото успешно удалена из галереи',
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
               // $scope.allPhoto = _.without($scope.allPhoto, photo);
            }, function(err) {
                notify({
                    message: 'Ошибка. Ищи причину в себе :)',
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
    }
    // открыть картинку
    $scope.openImage=function(photo,user,allphoto){

    }
    // лайкнуть картнку
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
            req.action='LikePhoto';
            reqPromise = PHP_server.Photo(req)
        } else {
            req.action='dislikeVideo';
            reqPromise = PHP_server.Photo(req)
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
    // получения данных по группе
    function getGroup() {
        var req={
            action:'GetGrouponId'
        };
        PHP_server.Images(req)
            .then(function(resolve) {
                //$scope.group = resolve;
                console.log(resolve);
            });
    };

    getGroup();

}]);