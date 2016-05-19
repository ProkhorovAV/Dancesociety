
angular.module("myApp.controllers.SelectImage", [])
    .controller("SelectImageCtrl",['$scope', '$modalInstance','SERVER', 'alreadySelected', '$upload', '$window', 'notify','PHP_server',
        function($scope, $modalInstance, SERVER, alreadySelected, $upload, $window, notify,PHP_server) {
            // отмена добавления
            $scope.cancel=function(){
                // отмена
                $modalInstance.dismiss('cancel');
            };
            // загрузка фото
            $scope.upload=function(files){
                console.log(files);
                if (!files || !files.length) {
                    return;
                }
                var file = files[0];
                $upload.upload({
                       // url: $window.danceConfig.restUrlBase + '/api/photos',
                       // file: file,
                    })
                    .error(function(data) {
                        notify({
                            message: 'Ошибка. Ищи причину в себе :)',
                            classes: 'alert-danger',
                            templateUrl: 'views/dialog/messages.html'
                        });
                    })
                    .success(function(data) {
                        console.log('загрузка успешно');
                        var abc = [];
                        abc.push(data);
                        $modalInstance.close(abc);
                    })

            };
            //  количество фотографий
            $scope.photoList=[{
                selectImage:1,
                path:'data/img/bg1.jpg'

            }];


            // кнопка ок
            $scope.ok=function(){
                var selectedImageList = [];
                /*
                $scope.photoList.map(function(el) {
                    if (el.selectImage) {
                        selectedImageList.push(el);
                    }
                    return el;
                });
                */
                //if(selectedImageList.length > 0) {
                // закрытие окон
                $modalInstance.close(selectedImageList);
                //} else {
                //    $modalInstance.dismiss(false);
                //}

            };

            // выбор картинки
            $scope.selectImage = function(index) {
                var selectCount = 0; // select images count
                $scope.photoList.map(function(el) {
                    if (el.selectImage) selectCount++;
                });
                // we check, if MAXCOUNT > selected image count, then we prohibit check new images
                if (selectCount < SERVER.MAXCOUNT) {
                    $scope.photoList[index].selectImage = !$scope.photoList[index].selectImage;
                } else {
                    $scope.photoList[index].selectImage = false;
                    return false;
                }
            }

            // получить перечень картинок
            var getImageList = function() {
                var req = {
                    action:'getImagesList',
                    'first': 'photos',
                    'second': 'user',
                    'count': 100
                };
                PHP_server.Images(req)
                    .then(function(response) {
                        /*
                        $scope.photoList = response.data;
                        if (alreadySelected) {
                            selectAlreadySelectedItems();
                        };
                        */
                    },function(err){
                        console.log('Ошибка получения картинок'+err);
                    });
            };

            getImageList();

                // непонятная функция
            /*
            var selectAlreadySelectedItems = function() {
                if (alreadySelected) {
                    alreadySelected.map(function(el) {
                        $scope.photoList.map(function(el2) {
                            if (el._id === el2._id) {
                                el2.selectImage = true;
                                return el2;
                            }
                        })
                    });
                }
            };
            */



        }]);
