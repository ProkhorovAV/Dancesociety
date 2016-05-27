angular.module('myApp.controllers.PageVacancy',[])
.controller('PageVacancyCtrl',['$scope','PHP_server','notify','$stateParams',
    function($scope,PHP_server,notify,$stateParams){

        // все вакансии
        $scope.allVacancies=[
            /*{
            groupAuthor:{
                photo:'data/img/bg1.jpg',
                name:'Sasha',
                created:'12.12.2009',
                author:{
                    _id:1
                },
                title:"название вакансии",
                country:{
                    name:'USA'
                },
                city:'USA',
                scopes:[1,2,3],
                dances:[1,2,3],
                price:123,
                startDate:'12/12/12',
                endDate:"12/12/12",
                startAge:12,
                endAge:22,
                startHeight:123,
                endHeight:2222,
                text:'текст',
                reposts:12,
                isLiked:1,
                likes:12,
                comments:[{
                    author:{
                        userpic:'data/user/face.jpg',
                        firstname:'Sasha',
                        secondname:'Prokhorov',
                        _id:1
                    },
                    created:'12.12.2009',
                    text:'text'
                }]



            }
        }
        */
        ]

    //! получения новостей от группы
    $scope.getPublicPageOnId=function(){
        var req={
            action:"getVacancyOnIdPage",
            data:{
                idPage:$stateParams.id
            }
        };
        return PHP_server.Vacancy(req);
    };
    //! получение новостей от группы
    $scope.getPublicPageOnId()
        .then(function(response){

            // если ошибка передачи
            if (JSON.parse(response.data.error)){
                ErrorService.error(response.data)
            }else{
                // весение данных
                $scope.allVacancies=response.data.data;
                console.log(response.data);
            }
        },function(err) {
            console.log('Ошибка в получении жданных');
            console.log(err);
        });



        // какая-то таблица
    $scope.tabs = [{
        'name': 'name',
        'active': 'true'
    }]


   // получить коментарии  по вакансии через функцию getAllVacancies
    var getCommentsToPost = function(vacancy_id, cb) {
        var req = {
            action:'getComment',
            'first': 'vacancies',
            'second': 'responds',
            'id': vacancy_id
        }
        PHP_server.Comment(req)
            .then(function(resolve) {
                //cb(resolve.data);
            }, function(err) {
                console.log(err);
            });
    }


    // группа
    $scope.group={
        creator:{
            _id:1,
            userpic:'data/user/face.jpg'
        }

    }
    //гласная
    $scope.meData={
        _id:1
    }
    // данные в полях вакансии
    $scope.newVacancy={
        title:"Заголовок",
        country:'USA',
        city:"USA",
        startDate:"12.12.2019",
        endDate:"12.12.2009",
        price:123,
        startAge:12,
        endAge:22,
        startHeight:123,
        endHeight:1231,
        dances:'',
        text:'текст'

    };

    $scope.loadTags=[1,2,3];
    $scope.getWorks=[1,2,3];

    $scope.getCountries=[{
        address:[{
            name:'USA',

        }]
    }];
    // опубликовать вакансию
    $scope.createNewVacancy = function() {
        var req={
            action:'createNewVacancy'
        }
        var data = _.clone($scope.newVacancy);


        data.dances = data.dances.map(function(num, key) {
            return num._id;
        });

        data.scopes = data.scopes.map(function(num, key) {
            return num.name;
        });


        if (is.propertyDefined(req.country, '_id')) {
            data.country = data.country._id;
        } else {
            delete data.country;
        }

        console.log(is.propertyDefined(data, 'text'));

        if (is.not.propertyDefined(data, 'text') || data.text == '') {
            notify({
                message: 'Заполните обязательные поля !',
                classes: 'alert-danger',
                templateUrl: 'views/dialog/messages.html'
            });
        } else {
           // req.route = 'vacancies';
           // req.groupAuthor = groupId;

            PHP_server.Vacancy(req)
                .then(function(resolve) {
                    notify({
                        message: 'Вакансия успешно опубликована !',
                        classes: 'alert-success',
                        templateUrl: 'views/dialog/messages.html'
                    });
                    $scope.newVacancy = {};
                    $scope.getAllVacancies();
                    console.log(resolve);
                }, function(err) {
                    console.log(err);
                });
        }

    };
    // удаление вакансии
    $scope.removeVacancy = function(vacancy_id, index) {
        PHP_server.Vacancy({
            action:'deleteVacancy',
            route: 'vacancies',
            id: vacancy_id
        })
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
    $scope.shareVacancy=function(vacancy){

    };
    // лайкнуть вакансии
    $scope.likeVacancy=function(index){
        var vacancy = $scope.allVacancies[index],
            req = {
                action:'',
                route: 'likes',
                //id: vacancy._id,
                fortype: 'vacancy'
            },
            reqPromise;
        if (vacancy.isLiked) {
            req.action='LikesVacancy';
            reqPromise = PHP_server.Vacancy(req)
        } else {
            req.action='disLikesVacancy';
            reqPromise = PHP_server.Vacancy(req)
        }
        //vacancy.isLiked = !vacancy.isLiked;
        reqPromise
            .then(function(response) {
                //$scope.allVacancies[index].likes = response.data.likes;
                console.log(response);
            }, function(err) {
                console.log(response);
                // alert(err.data);
            });
    };
    // удалить коментарий
    $scope.removeVacancyComment=function(coment,index,vacancy){
        var req ={
            action:'deleteVacancyComment'
        }
        PHP_server.Vacancy(req)
            .then(function(resolve) {
               // vacancy.comments.splice(index, 1);
                notify({
                    message: 'Вы успешно удалили свой отклик на вакансию',
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
            },function(err) {
                notify({
                    message: err.message,
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
    };

    // новый коментарий
    $scope.newComment=['комантарий'];

    // добавить новый коментарий на вакансию
    $scope.newVacancyComment=function(index){

        var req = {
            action:'newComment',
            'text': $scope.newComment[index]
        };

        PHP_server.Vacancy(req)
            .then(function(resolve) {
               // $scope.allVacancies[index].comments.push(resolve);
                //$scope.newComment[index] = '';
                notify({
                    message: 'Вы успешно откликнулись на вакансию',
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
            },function(err) {
                notify({
                    message: err.message,
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
            });
    };

        // поделиться вакансией

    $scope.shareVacancy = function(vacancy) {

        var req = {
            actiion:'shareVacancy',
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
    }





}]);