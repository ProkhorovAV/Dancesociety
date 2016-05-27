angular.module('myApp.controller.PageResume',[])
.controller('PageResumeCtrl',['$scope','PHP_server','$stateParams',
    function($scope,PHP_server,$stateParams){


    //  публичная страница
    $scope.publicPage={
        /*
        creator:{
            _id:1
        },
        fullDescription:'текст обо мне',
        shortDescription:'кратко',
        phone:'+7 678 080 08 99',
        country:{
            name:"USA"
        },
        website:'www.sasha.ru',
        city:'USA',
        email:'sasha@yandex.ru',
        danceStyles:[{
            name:'namestyle1'
        }],
        newStyle:[{

        }],
        hasOwnProperty:function(style){
            return true;
        }
*/
    };

    //! получения вакансий
    $scope.getPublicPageOnId=function(){
        var req={
            action:"getPublicPageOnId",
            data:{
                idPage:$stateParams.id
            }
        };
        return PHP_server.PublicPages(req);
    };
    //! получение вакансий
    $scope.getPublicPageOnId()
        .then(function(response){
            // если ошибка передачи
            if (JSON.parse(response.data.error)){
                ErrorService.error(response.data)
            }else{
                // весение данных
                $scope.publicPage=response.data.data;
            }
        },function(err) {
            console.log('Ошибка в получении жданных');
            console.log(err);
        });

















    // определяющие значение
    $scope.meData={
        _id:1
    };
    // открытие странички
    $scope.editMode=true;

    // города
    $scope.countries=[{
        name:'USA'

    }];
    // перегрузка
    $scope.getCountries=function(select){
    };
    // удалить стиль
    $scope.removeStyle=function(index){
        // var index = $scope.user.danceStyles.indexOf(item);
        // if (index > -1) {
        //$scope.group.danceStyles.splice(index, 1);
        $scope.changeDanceStyles();
        // }
    }
    // получение стилей
    $scope.changeDanceStyles = function() {
        var request = {
            action:'GetAllStyle'
        };
        /*
        request.dances = $scope.group.danceStyles
            .map(function(item) {
                return item._id;
            });
        */
        PHP_server.Style(request)
            .then(function(resolve) {
                console.log(resolve);
            }, function(err) {

            })
    }
    // смена данных о пользователе
    $scope.changeInfo = function() {
        var req = {
            action:'ChangInformationUser',
            'country': $scope.group.country._id,
            'city': $scope.group.city,
            'email': $scope.group.email,
            'phone': $scope.group.phone,
            'website': $scope.group.website,
            'address': $scope.group.address,
            'statusText': $scope.group.statusText,
            'bg': $scope.group.bg._id
        };

        PHP_server.User(req)
            .then(function(resolve) {
                console.log(resolve);
            }, function(err) {

            })
    }
    // загрузка названий тегов
    $scope.loadTags = function(query) {
        return PHP_server.Tag({
            action:'GetTags',
            route: 'dances',
            q: query
        })
            .then(function(response) {
                //$scope.styles = response.data;
                return response.data;
            },function(err){
                console.log(err);
            });
    };
    // добавить новый стиль
    $scope.addNewStyle = function(style) {
        if(!$scope.group.hasOwnProperty('danceStyles')) $scope.group.danceStyles = [];
        $scope.group.danceStyles.push(style);
        $scope.group.newStyle = '';
        $scope.changeDanceStyles();
    }




    // Метод для получения списка всех стран с нашего сервера

    $scope.getCountries = function(val) {
        //вставить функцию ранее созданную
    };
    // получение работников
    $scope.getWorks = function(query) {
        // полцчение работников
    };
    // смена статуса
    $scope.changeStatus = function(description) {
        var req = {
            action:'ChangStatus',
            'fullDescription': $scope.group.fullDescription,
            'shortDescription': $scope.group.shortDescription
        }
        console.log(req);
        PHP_server.Status(req)
            .then(function(resolve) {
                console.log(resolve);
            }, function(err) {
                console.log(err)
            })
    }
     // пока нет функции

    /*
    $scope.subscribeToGroup = function(group, status) {
        console.log(status);
        status=true;
        if(status) {
            $http.post($window.danceConfig.restUrlBase + '/api/groups/' + group._id + '/members')
                .then(function(resolve) {
                    console.log(resolve);
                    group.dick = true;
                    group.membersCount++;
                }, function(reject) {
                    console.log(reject);
                });
        } else {
            $http.delete($window.danceConfig.restUrlBase + '/api/groups/' + group._id + '/members')
                .then(function(resolve) {
                    console.log(resolve);
                    group.dick = false;
                    group.membersCount--;
                    console.log(resolve);
                }, function(reject) {
                    console.log(reject);
                });
        }
    }
    */

   // $scope.groupTypes = groupTypes;
    // $scope.groupTypes[group.groupType]
    // функция не определена
    /*
    $scope.sentDanceStyles = function() {
        var request = {};
        request.dances = $scope.group.danceStyles
            .map(function(item) {
                return item._id;
            });
        $http.put($window.danceConfig.restUrlBase + '/api/groups/' + groupId + '/dances', req)
            .then(function(data) {
                console.log(data);
            });
    }
  */
    //  выбрать картинку функция не определена
    /*
    $scope.selectImage = function(maxCount, type) {
        var modalInstance = $modal.open({
            templateUrl: 'views/selectImageModal.html',
            controller: 'SelectImageCtrl',
            windowClass: 'select__image_window',
            resolve: {
                MAXCOUNT: function() {
                    return maxCount;
                },
                alreadySelected: function() {
                    return false;
                }
            }
        });

        modalInstance.result.then(function(selectedList) {
            switch (type) {
                case 'bg':
                    changeBackgroundImage(selectedList[0]._id);
                    break;
                case 'userpic':
                    changeProfileImage(selectedList[0]._id);
                    break;
            }

        }, function() {
            notify({
                message: 'Вы не выбрали изображение',
                classes: 'alert-danger',
                templateUrl: 'views/notify.html'
            });
        });
    };

    */
    // две функции которые нужны для selectImage
    /*
    var changeBackgroundImage = function(image) {
        var req = {
            'bg': image
        };

        $http.patch($window.danceConfig.restUrlBase + '/api/groups/' + groupId, req)
            .then(function(resolve) {
                $window.location.reload();
                console.log(resolve);
            }, function(reject) {

            })
    };

    var changeProfileImage = function(image) {
        var req = {
            'photo': image
        };

        $http.put($window.danceConfig.restUrlBase + '/api/groups/' + groupId + '/photo', req)
            .then(function(resolve) {
                $window.location.reload();
                console.log(resolve);
            }, function(reject) {

            });
    };

    */

}]);