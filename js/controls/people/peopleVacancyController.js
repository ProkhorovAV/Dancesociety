angular.module('myApp.controllers.PeopleVacancy',[])
.controller('PeopleVacancyCtrl',['$scope','PHP_server','notify','$stateParams',
    function($scope,PHP_server,notify,$stateParams){


        // все вакансии
        $scope.allVacancies=[
            /*{
            author:{
                userpic:'data/user/face.jpg',
                firstname:'Sasha',
                secondname:'Prokhorov',
                created:'12.12.2009',
                _id:1,
                title:'title',
                country:{
                    name:'USA'
                },
                city:'USA',
                scopes:[{}],
                dances:[{}],
                price:12,
                startDate:'12.12.2009',
                endDate:'12.12.2009',
                startAge:12,
                endAge:12,
                startHeight:123,
                endHeight:123,
                text:'text',
                reposts:1,
                isLiked:true,
                likes:10,
                comments:{
                    author:{
                        userpic:'data/user/face.jpg',
                        firstname:'Sasha',
                        secondname:'Prokhorov',
                        _id:1
                    },
                    text:'text',
                    created:'12.12.2009'
                }

            }
        }
        */
        ];


        //! получения вакансий
        $scope.getVacancyOnId=function(){
            var req={
                action:"getVacancyOnId",
                data:{
                    idPeople:$stateParams.id
                }
            };
            return PHP_server.User(req);
        };
        //! получение ввакансий
        $scope.getVacancyOnId()
            .then(function(response){

                // если ошибка передачи
                if (JSON.parse(response.data.error)){
                    ErrorService.error(response.data)
                }else{
                    // весение данных
                    $scope.allVacancies=response.data.data;
                    console.log(response.data.data);
                }
            },function(err) {
                console.log('Ошибка в получении жданных');
                console.log(err);
            });


        // вакансии новые
        $scope.newVacancy=[
            /*{
             title:'title',
             country:"USA",
             city:'USA',
             startDate:'12.12.2009',
             endDate:'12.12.2019',
             price:12,
             startAge:12,
             endAge:22,
             startHeight:123,
             endHeight:2121,
             text:'text'
             }*/
        ];

















        $scope.tabs = [{
            'name': 'name',
            'active': 'true'
        }];



        $scope.meData={
        _id:1,
        userpic:'data/user/face.jpg'
    };
    $scope.user={
        isMyProfile:1
    };


    // названия городов
    $scope.countries=[{
        name:'USA'
    }]
    // reload
    $scope.getCountries=function(select){

    };
    // фильтр
        $scope.multiselectModel = {
            model: [],
            data: [],
            settings: {
                enableSearch: true,
                showCheckAll: false,
                showUncheckAll: false,
                buttonClasses: 'btn btn-default danciety-multiselect__btn jobs__select',
                displayProp: 'name',
                idProp: '_id',
                externalIdProp: ''
            },
            filter: '',
            translations: {
                searchPlaceholder: 'Name',
                buttonDefaultText: 'Select styles'
            }
        };


    // удалить вакансию
        $scope.removeVacancy = function(vacancy_id, index) {
            var req={
                action:'removeVacancy'
            }

            PHP_server.Vacancy(req)
                .then(function(response) {
                    //$scope.allVacancies.splice(index, 1);
                    notify({
                        message: 'Вакансия успешно удалена',
                        classes: 'alert-success',
                        templateUrl: 'views/dialog/messages.html'
                    });
                }, function(err) {
                    notify({
                        message: err.data.error,
                        classes: 'alert-success',
                        templateUrl: 'views/dialog/messages.html'
                    });
                });
        };
    // поделиться
        $scope.shareVacancy = function(vacancy) {

            var req = {
                action:'shareVacancy',
                title: (vacancy.title || vacancy.text),
                route: 'posts',
                copyFromId: vacancy._id,
                copyFromType: 'vacancy'
            };

            PHP_server.Vacancy(req)
                .then(function(resolve) {
                    notify({
                        message: 'Эта вакансия появится на Вашей странице.',
                        classes: 'alert-success',
                        templateUrl: 'views/dialog/messages.html'
                    });
                    //vacancy.reposts++;
                }, function(err) {
                    notify({
                        message: 'Ошибка. Мы уже знаем о ней.',
                        classes: 'alert-danger',
                        templateUrl: 'views/dialog/messages.html'
                    });
                });
        };
    // лайкнуть вакансии
        $scope.likeVacancy = function(index) {
            var vacancy = $scope.allVacancies[index],
                req = {
                    action:'',
                    route: 'likes',
                    id: vacancy._id,
                    fortype: 'vacancy'
                },
                reqPromise;
            if (vacancy.isLiked) {
                req.action='LikesVacancy';
                reqPromise = PHP_server.Vacancy(req);
            } else {
                req.action='disLikesVacancy';
                reqPromise = PHP_server.Vacancy(req);
            }
            //vacancy.isLiked = !vacancy.isLiked;
            reqPromise
                .then(function(response) {
                   // $scope.allVacancies[index].likes = response.data.likes;
                    console.log(response);

                }, function(err) {
                        console.log(err);
                    // alert(err.data);
                });
        };
    // удалить коментарии на вакансию
        $scope.removeVacancyComment = function(comment_id, index, vacancy) {
            var req={
                action:'removeVacancyComment'
            }
            PHP_server.Vacancy(req)
                .then(function(resolve) {
                    //vacancy.comments.splice(index, 1);
                    notify({
                        message: 'Вы успешно удалили свой отклик на вакансию',
                        classes: 'alert-success',
                        templateUrl: 'views/display/messages.html'
                    });
                },function(err) {
                    notify({
                        message: err.message,
                        classes: 'alert-danger',
                        templateUrl: 'views/dialog/messages.html'
                    });
                });
        };
    // откликнуться коментарием на вакансию
    $scope.newVacancyComment = function(index) {

        var req = {
            action:'newVacancy',
            'text': $scope.newComment[index]
        };


        PHP_server.Vacancy(req)
            .success(function(resolve) {
                //$scope.allVacancies[index].comments.push(resolve);
                //$scope.newComment[index] = '';
                notify({
                    message: 'Вы успешно откликнулись на вакансию',
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
            })
            .error(function(err) {
                notify({
                    message: err.message,
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
    };
        // слушатель изменений в фильтре
        $scope.$watch('multiselectModel.filter', function(newValue, oldValue) {
            /*
            $scope.loadTags(newValue).then(function(result) {
                $scope.multiselectModel.data = result;
            });
            */
        });

        // Метод для загрузки подсказок о танцевальных направлениях

        $scope.loadTags = function(query) {
            var req={
                action:'helper'
            }
            return PHP_server.Helpers(req)
                .then(function(response) {
                    return response.data;
                });
        };
        // создать вакансию
        $scope.createNewVacancy = function() {

           // var req = _.clone($scope.newVacancy);

            //req.dances = [];

            // req.dances = req.dances.map(function(num, key) {
            // 	return num._id;
            // });
/*
            if (is.propertyDefined($scope.multiselectModel, 'model')) {
                $scope.multiselectModel.model.map(function(num, key) {
                    req.dances.push(num._id);
                });
            }
*/
            // req.scopes = req.scopes.map(function(num, key) {
            // 	return num.name;
            // });

/*
            if (is.propertyDefined(req.country, '_id')) {
                req.country = req.country._id;
            } else {
                delete req.country;
            }

*/
            var req = {
                action:'createNewVacancy'
            }
            if (is.not.propertyDefined(req, 'text') || req.text === '') {
                notify({
                    message: 'Заполните обязательные поля !',
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
            } else {

                PHP_server.Vacancy(req)
                    .then(function(resolve) {
                        notify({
                            message: 'Вакансия успешно опубликована !',
                            classes: 'alert-success',
                            templateUrl: 'views/dialog/messages.html'
                        });
                        $scope.newVacancy = {};
                        $scope.getAllVacancies();

                    }, function(err) {

                    });
            }

        };
        // инициализация вакансий
        $scope.getAllVacancies = function() {
            var req = {
                action:'gelAllvacancy',
                route: 'vacancies',
                id: $scope.user._id
            };
            PHP_server.Vacancy(req)
                .then(function(result) {
                    //$scope.tabs[0].active = true;
                    /*
                    result.data.map(function(el, index) {
                        el.dances.map(function(el2, index) {
                            el.dances[index] = el2.name;
                            return el2;
                        });
                        return getCommentsToPost(el._id, function(comments) {
                            el.comments = comments;

                            return el;
                        });
                    });
                    */
                    //$scope.newComment = [];
                    //$scope.allVacancies = result.data;
                    console.log(result);
                }, function(err) {
                    console.log(err);
                });
        };
            // функция для getAllVacancies
        var getCommentsToPost = function(vacancy_id, cb) {
            var req = {
                'first': 'vacancies',
                'second': 'responds',
                'id': vacancy_id
            };
            PHP_server.Vacancy(req)
                .then(function(resolve) {
                    cb(resolve.data);
                }, function(err) {

                });
        };


        // Метод для получения списка всех стран с нашего сервера

        $scope.getCountries = function(val) {
            var req={
                action:'getcountries'
            }
            return PHP_server.Helpers(req)
                .then(function(response) {
                    //$scope.countries = response.data;
                    return response.data;
                });
        };










}]);
