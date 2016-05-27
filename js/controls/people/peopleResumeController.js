angular.module('myApp.controllers.PeopleResume',[])
.controller('PeopleResumeCtrl',['$scope','$stateParams','ErrorService','PHP_server',
    function($scope,$stateParams,ErrorService,PHP_server){



        // страничка переменная обо мне
        $scope.editMode=false;

        // юзер
        $scope.user={
            /*
            isMyProfile:true,
            preferences:{
                additionally:'text'
            },
            phone:'484 84 8 4',
            country:'',
            website:'www.ww.ww',
            city:'USA',
            cv_email:'werqw@ffqdwqd',
            personalData:{
                male:true,
                params:"параметры",
                age:12,
                eyesColor:"карие",
                height:123,
                hairColor:'red',
                weight:112,
                nationality:'Rus'
            },
            danceStyles:[{
                name:"name"
            }],
            works:[{
                place: 'Moscow',
                start:"12.12.2009",
                end:'12.12.2000',
                job:"job"
            }],
            studys:[{
                place:'место',
                start:'12.12.2000',
                end:'12.12.2000',
                direction:"spec"
            }],
            newPayment:11
*/
        };
    //! получения user
    $scope.getUser=function(){
        var req={
            action:"getUserOnId",
            data:{
                idPeople:$stateParams.id
            }
        };
        return PHP_server.User(req);
    };
    //! получение user
    $scope.getUser()
        .then(function(response){
            // если ошибка передачи
            if (JSON.parse(response.data.error)){
                ErrorService.error(response.data)
            }else{
                // весение данных
                $scope.user=response.data.data;
            }
        },function(err) {
            console.log('Ошибка в получении жданных');
            console.log(err);
        });


    // набор параметров
    /*
    $scope.user = currentUser;
    $scope.user.work.map(function(item) {
        item.date = {
            startDate: item.start,
            endDate: item.end
        }
    });
    $scope.user.study.map(function(item) {
        item.date = {
            startDate: item.start,
            endDate: item.end
        }
    });
    $scope.personal = {}

     $scope.payments = [{
     "name": "",
     "price": ""
     }];


    */



    // пол user
    /*
    $scope.personal.maleHelper = [{
        "name": "Мужской",
        "id": true
    }, {
        "name": "Женский",
        "id": false
    }];
*/
    $scope.work = {};

    $scope.work= {
        date:{
            startDate: null,
            endDate: null
            }
    }


    $scope.countries=[{
        name:"USA"
    }];
    // переменная q
    $scope.payments=[{
        name:'Sasha',
        price:123
    }];
    // сменить информацию
    $scope.changeInfo = function() {
        var req = {
            action:'ChangInformationUser',
            'country': $scope.user.country._id,
            'city': $scope.user.city,
            'cv_email': $scope.user.cv_email,
            'phone': $scope.user.phone,
            'website': $scope.user.website
        };

        PHP_server.User(req)
            .then(function(resolve) {
                console.log(resolve);
            }, function(err) {
                console.log(err);

            })
    }
    // получиь страны
    $scope.getCountries = function(val) {
        var req= {
            action:'getcountries'
        }
        return PHP_server.Helpers(req)
            .then(function(response) {
               // $scope.countries = response.data;
                console.log()(response);
                return response.data;
            },function(err){
                console.log(err);
            });
    };
    // сменить данные
    $scope.changePersonal = function() {
       // var req = $scope.user.personalData;
        var req={
            action:'ChangInformationUser'
        }
        return PHP_server.User({
            route: 'personal',
            personal: req
        })
            .then(function(response) {
                console.log(response);
            },function(err){
                console.log(err);
            });
    }
    // загрузка стилей
    $scope.loadTags = function(query) {
        req={
            action:'GetAllStyle'
        }
        return PHP_server.Style(req)
            .then(function(response) {
                //$scope.styles = response.data;
                console.log(response);
                return response.data;
            },function(err){
                console.log(err);
            });
    };
    // зафиксировать стиль
    $scope.sentDanceStyles = function() {
        /*
        var request = {};
        request.dances = $scope.user.danceStyles
            .map(function(item) {
                return item._id;
            });
        */
        var req={
            action:'sendStyle'
        }
        PHP_server.Status(req)
            .then(function(response) {
                console.log(response);
            },function(err){
                console.log(err);
            });
    }

    // изменить стили
    $scope.removeStyle=function(index){
        // var index = $scope.user.danceStyles.indexOf(item);
        // if (index > -1) {
        //$scope.user.danceStyles.splice(index, 1);
        $scope.sentDanceStyles();
        // }
    };
    // добавление нового стиля
    $scope.addNewStyle=function(style){
       // $scope.user.danceStyles.push(style);
        //$scope.user.newStyle = '';
       // $scope.sentDanceStyles();
    };
    // q параметры
    $scope.payments=[{
        name:'name',
        price:12
    }];
    // непонятная функция
    $scope.putPayments = function() {
        var request = {};
        //var av = $scope.availablePayments;
      /*
        request.prices = $scope.payments.map(function(item) {
            if ((item.name !== "") && (item.price !== "")) {
                for (var i = 0; i < av.length; ++i) {
                    if (item.name === av[i].name) {
                        return {
                            kind: av[i]._id,
                            price: item.price
                        }
                    }
                }
            } else {
                var index = $scope.payments.indexOf(item);
                if (index > -1) {
                    $scope.payments.splice(index, 1);
                }
            }
        });

        $http.put(MC.PATH + "/api/user/me/prices", request).success(function(data) {

        }).error(function(data) {

        });
        */
    }

    // Метод для добавления нового типа платежа
    $scope.addPaymentsField = function() {
        $scope.putPayments(); // send payments to server
        $scope.payments.push({
            "name": $scope.availablePayments[0].name,
            "price": "0"
        });
    }

    // Метод для удаления типа платежа
    $scope.deletePaymentsField=function(index){
        // var index = $scope.payments.indexOf(item);
        // if (index > -1) {
        //$scope.payments.splice(index, 1);
        //$scope.putPayments();
        // }
    };
    // новые параметры
    $scope.addNewPayment=function(param){
       // newPayment.price = 1000;
        //$scope.payments.push(newPayment);
        //$scope.user.newPayment = '';
        //$scope.putPayments();
    };
    // смена работы
    $scope.changeWork=function(){
        // копировать массив
        //var req = _.clone($scope.user.work);
        // var req = $scope.user.work;
        // массив преобразовать
        /*
        req.map(function(item) {
            item.start = item.date.startDate;
            item.end = item.date.endDate;
        });
        */
        var req={
            action:'changWorks'
        };
        return PHP_server.Worker()
            .then(function(response) {
                console.log(response);
            },function(err){
                console.log(err);
            });
    }
    // кнопка добавить работу
    $scope.addWorkField=function(){
        //$scope.user.work.push({date: {startDate: '',
        //    endDate: ''}});
        //$scope.changeWork();
    }
    // смена учебного заведения
    $scope.changeStudy=function(){
        //var req = $scope.user.study;
        // var req = $scope.user.work;
        /*
        req.map(function(item) {
            item.start = item.date.startDate;
            item.end = item.date.endDate;
        });
        */
        var req={
            action:'changeStudy'
        }
        return PHP_server.User(req)
            .then(function(response) {
                console.log(response);
            },function(err){
                console.log(err);
            });
    };
    // добавить учебноезаведение
    $scope.addStudyField= function(){
        //$scope.user.study.push({date: {startDate: '',
        //    endDate: ''}});
        //$scope.changeStudy();
    }

    // Метод для получения всех высших учебных заведений с vk
    $scope.getUniversity = function(val) {
        /*
        return CountriesFactory.getUniversities(val)
            .then(function(response) {
                // $scope.universityList = _.rest(response.data.response);
                // response.data.response.splice(1, response.data.response.length);
                // return _.rest(response.data.response);
                // return response.data.response.map(function(item) {
                //         return item.title;
                // });
            });
        */
    }

    $scope.getUniversity();
    // устновка каких-то параметров
/*
    $scope.getavailablePayments = function(data) {
        return RestApi.helpers({
            route: 'price_types'
        }).$promise
            .then(function(response) {
                $scope.availablePayments = response.data;
                $scope.payment = response.data[1];
                $scope.getUserPayments();
            });
    }

    $scope.getavailablePayments(currentUser);
*/

    // Метод для получения всех полных адресов с гугл карт
    /*
     $scope.getLocation = function(val) {
     return CountriesFactory.getAdress(val)
     .then(function(response) {
     $scope.locationsList = response.data.result;
     return response.data.results;
     }).then(function(response) {

     });
     }


     */
    $scope.upload = function(files) {
        /*
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: MC.PATH + '/api/user/me/userpic',
                    file: file
                }).progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' +
                        evt.config.file.name);
                }).success(function(data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' +
                        JSON.stringify(data));

                    $window.location.reload();
                });
            }
        }
        */
    };
       // удалить работника
    $scope.deleteWorkField = function(index) {
        //$scope.user.work.splice(index, 1);
       // $scope.changeWork();
    }
    // удалить стиль
    $scope.deleteStudyField = function(index) {
        //$scope.user.study.splice(index, 1);
        //$scope.changeStudy();
    };

    $scope.changePreferences = function() {
            /*
        var req = _.clone($scope.user.preferences);

        req.countries = req.countries.map(function(num, key) {
            return num._id;
        });
            */
        // req.scopes = req.scopes.map(function(num, key) {
        // 	return num.name;
        // });

            var req={
                action:'changePreferences'
            }
        return PHP_server.User(req)
            .then(function(data) {
                console.log(data);
            },function(err){
                console.log(err);
            });
    };
/*
    var changeBackgroundImage = function(image) {
        RestApi.savePhoto({
            route: 'bg',
            bg: image
        }).$promise
            .then(function(data) {
                $window.location.reload();
            });
    };

    var changeProfileImage = function(image) {
        RestApi.savePhoto({
            route: 'userpic',
            userpic: image
        }).$promise
            .then(function(data) {
                $window.location.reload();
            });
    };

    */
        // получить работников
        /*
    $scope.getWorks = function(query) {
        var req = {
            action:'getWorker',
            route: 'scopes',
            q: query
        }
        return PHP_server.Worker(req)
            .then(function(resolve) {

                return resolve.data;
            }, function(err) {
                console.log(err)
            });
    };
*/
    // $scope.addWork = function() {
    // 	$scope.workModel.start = new Date($scope.workModel.date.startDate);
    // 	$scope.workModel.end = new Date($scope.workModel.date.endDate);
    //
    // 	$scope.user.work.push($scope.workModel);
    //
    // 	$scope.workModel = {};
    //
    // 	$scope.changeWork();
    // }

    // Виды пола для выпадающего списка

/*
    if(!$scope.user.personalData.hasOwnProperty('male')) {
        $scope.user.personalData.male = $scope.personal.maleHelper[0];
    }
*/
        /*
    $scope.getUserPayments = function() {
        $scope.payments = $scope.user.prices.map(function(item) {
            for (var i = 0; i < $scope.availablePayments.length; ++i) {
                if ($scope.availablePayments[i]._id === item.kind) {
                    return {
                        name: $scope.availablePayments[i].name,
                        price: item.price
                    }
                }
            }
        });
    }
*/
}]);
