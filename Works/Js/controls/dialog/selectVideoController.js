angular.module('myApp.controller.SelectVideo',[])
.controller('SelectVideoCtrl',['$scope','PHP_server',function($scope,PHP_server){
    // отмена
         $scope.cancel=function(){

        };
    // ок
    $scope.ok=function(){

    };
    // количество фото
        $scope.photoList=[{

        }];
      // открыть видео
        $scope.openVideo=function(){

        }
    // открыть картинку
    $scope.selectImage=function(){

    }
    // алйкнуть видео
    $scope.likeVideo=function(){

    }

// вставиь функции
/*
    'use strict';

    angular.module("myApp.controllers.SelectVideo", [])
        .controller("SelectVideoCtrl",
            function ($scope, $modalInstance, RestApi, MAXCOUNT, alreadySelected, notify) {
                var getImageList = function () {
                    var req = {
                        'first': 'videos',
                        'second': 'user',
                        'count': 100
                    };
                    RestApi.getlist(req).$promise
                        .then(function (response) {
                            $scope.photoList = response.data;
                            if(alreadySelected) {
                                selectAlreadySelectedItems();
                            };
                        });
                };

                getImageList();

                var selectAlreadySelectedItems = function () {
                    alreadySelected.map(function (el) {
                        $scope.photoList.map(function (el2) {
                            if(el._id === el2._id) {
                                el2.selectImage = true;
                                return el2;
                            }
                        })
                    });
                };

                $scope.ok = function () {
                    var selectedImageList = [];
                    $scope.photoList.map(function (el) {
                        if (el.selectImage) {
                            selectedImageList.push(el);
                        }
                        return el;
                    });
                    //if(selectedImageList.length > 0) {
                    $modalInstance.close(selectedImageList);
                    //} else {
                    //    $modalInstance.dismiss(false);
                    //}

                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

                $scope.selectImage = function (index) {
                    var selectCount = 0; // select images count
                    $scope.photoList.map(function (el) {
                        if(el.selectImage) selectCount++;
                    });
                    // we check, if MAXCOUNT > selected image count, then we prohibit check new images
                    if(selectCount < MAXCOUNT) {
                        $scope.photoList[index].selectImage = !$scope.photoList[index].selectImage;
                    } else {
                        if(!$scope.photoList[index].selectImage) {
                            notify({
                                message: 'Вы можете прикрепить максимум ' + MAXCOUNT + ' видеозаписи',
                                classes: 'alert-danger',
                                templateUrl: 'views/notify.html'
                            });
                        }
                        $scope.photoList[index].selectImage = false;
                        return false;
                    }
                }
            }
        );

*/
}])
