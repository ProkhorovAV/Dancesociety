angular.module("myApp.controllers.Jobs", [])
    .controller("JobsCtrl", [
        "$scope",'PHP_server','notify','ErrorService',
        function ($scope,PHP_server,notify,ErrorService) {

            //! перечень вакансии с сервера
            $scope.arrayVacancy=[
                /*
                {
                    author:{
                        userpic:'data/user/face.jpg',
                        firstname:'Sasha',
                        secondname:'Prokhorov'
                    },
                    created:"12.12.2001",
                    title:'Вакансия',
                    country:{
                        name:'вакансия супер',
                        city:"USA",
                        scopes:[1,2,3],
                        dances:[{
                            name:'name'
                        }],
                        price:'12312',
                        startDate:'12.12.2011',
                        endDate:'12.12.2016',
                        startAge:12,
                        endAge:22,
                        startHeight:132,
                        endHeight:123123,
                        text:'тест',
                        reposts:10,
                        isLiked:true,
                        likes:10,
                        comments:[{
                            author:{
                                userpic:'data/user/face.jpg',
                                firstname:'Sasha',
                                secondname:'Prokhorov',
                                _id:1


                            },
                            created:'12.12.2012',
                            text:'текст коментария'
                        }]

                    },
                    isLiked:true

                }
                */
            ];

            //! получения вакансий
            $scope.getVacancy=function(){
                var req={
                    action:"getAllVacancy"
                };
                return PHP_server.Vacancy(req);
            };
            //! получение вакансий
            $scope.getVacancy()
                .then(function(response){
                    // если ошибка передачи
                    if (JSON.parse(response.data.error)){
                        ErrorService.error(response.data)
                    }else{
                        // весение данных
                        $scope.arrayVacancy=response.data.data;
                    }
                },function(err) {
                    console.log('Ошибка в получении жданных');
                    console.log(err);
                });



            // открытие странички новостй
            $scope.searchPanel=true;
            //фильтрация новостей
            $scope.vacancyFilter={
              country:"Москва",
                city:"город"
            };
            // перечень городов с сервера
            $scope.countries=[{
                name:'Москва'
            }];
            // первоначальные данные
            $scope.multiselectModel={

                filter:'',
                data:[],
                model:[],
                settings:{
                    enableSearch: true,
                    showCheckAll: false,
                    showUncheckAll: false,
                    buttonClasses: 'btn btn-default danciety-multiselect__btn jobs__select',
                    displayProp: 'name',
                    idProp: '_id',
                    externalIdProp: ''
                },
                translations:{
                    searchPlaceholder: 'Name',
                    buttonDefaultText: 'Select a styles'
                },
                modelEvents:''   // не нашел
            };


            // переменная для комментарии  вакансии
            $scope.newComment=[];

            // прокоментировать новую вакансию
            $scope.newVacancyComment=function(index){
                var req = {
                    action:'newComment',
                    'text': $scope.newComment[index]
                }
                return PHP_server.Comment(req)
                .then(function(resolve){
                    // здесь добавить коментарий
                    //$scope.searchResults[index].comments.push(resolve);
                    //$scope.newComment[index] = '';

                    notify({
                        message: 'Вы успешно откликнулись на вакансию',
                        classes: 'alert-success',
                        templateUrl: 'views/dialog/messages.html'
                    });


                },function(err){
                    notify({
                        message: err.message,
                        classes: 'alert-danger',
                        templateUrl: 'views/dialog/messages.html'
                    })}
                    )

            };


            // удалить вакансию
            $scope.removeVacancyComment=function(comment_id, index, vacancy){

            };
            // лайкнуть вскансию
            $scope.likeVacancy=function(index){
                var vacancy = $scope.searchResults[index],
                    req = {
                        action:'LikesVacancy',
                        data:''
                    },
                    reqPromise;
                if (vacancy.isLiked) {
                    req.data="set";
                    reqPromise = PHP_server.Likes(req);
                } else {
                    req.data="delete";
                    reqPromise = PHP_server.Likes(req);
                }
                vacancy.isLiked = !vacancy.isLiked;
                reqPromise
                    .then(function(response) {
                       // $scope.searchResults[index].likes = response.data.likes;
                    }, function(err) {
                        console.log('ошибка лайка');
                        // alert(err.data);
                    });
            };
            // вакансии поделиться
            $scope.shareVacancy=function(vacancy){

            };
            // что-то связанное с стоимотью
            $scope.minPrice = 0;
            $scope.maxPrice = 6000;
            $scope.priceFrom = $scope.minPrice;
            $scope.priceTo = 2000;

            // получение города с сервера
            $scope.getCountries=function(select){
                return PHP_server.Helpers({
                    action:'gethelper'
                })
                    .then(function(response) {
                        //$scope.countries = response.data;
                        return response.data;
                    });
            };
            // кнопка применить поиск
            $scope.searchVacancy = function() {

                var req = {
                    'route': 'search',
                    'id': 'vacancies',
                    'dances': [],
                    price:0
                };

                console.log($scope.vacancyFilter);
                // копирование элементов с затиранием новых
                _.extend(req, $scope.vacancyFilter);


                req.price = $scope.priceTo;
                    // проверка и добавление свойства
                if (is.propertyDefined($scope.multiselectModel, 'model')) {
                    $scope.multiselectModel.model.map(function(num, key) {
                        req.dances.push(num._id);
                    });
                }
                    // проверка и добавление свойства
                if (is.propertyDefined(req, 'country')) {
                    req.country = req.country._id;
                }
                // перебор коллекции
                _.each(req, function(num, key) {
                    if (num === '') {
                        delete req[key];
                    }
                });
                    // запрос при поиске
                /*
                PHP_server.query(req)
                    .then(function(resolve) {
                        console.log(resolve);
                        $scope.searchResults = resolve.data;
                        resolve.data.map(function(el) {
                            return getCommentsToPost(el._id, function(comments) {
                                el.comments = comments;
                                return el;
                            });
                        });
                        $scope.newComment = [];
                    }, function(err) {});
                */

            };


            // кнопка сбросить
            $scope.cancelSearch=function(){

            };
            // кнопка свернуть
            $scope.createNewVacancy=function(){
                // нет
            };
                // наверное получение перечня работников
            $scope.getWorks = function(query) {
                var req = {
                    action:'WorksJob',
                    q: query
                };
                return PHP_server.Worker(req)
                    .then(function(resolve) {

                        return resolve.data;
                    }, function(err) {
                            console.log('Ошибка получения работкников'+err);
                    });
            };
            // разместить вакансию
            $scope.shareVacancy = function(vacancy) {

                var req = {
                    action:'SetJob',
                    title: (vacancy.title || vacancy.text),
                    route: 'posts',
                    copyFromId: vacancy._id,
                    copyFromType: 'vacancy'
                };
                PHP_server.Job(req)
                    .then(function(resolve) {
                        notify({
                            message: 'Эта вакансия появится на Вашей странице.',
                            classes: 'alert-success',
                            templateUrl: 'views/dialog/messages.html'
                        });
                        vacancy.reposts++;
                    }, function(err) {
                        notify({
                            message: 'Ошибка. Мы уже знаем о ней.',
                            classes: 'alert-danger',
                            templateUrl: 'views/dialog/messages.html'
                        });
                    });
            };
            // получение перечня коментарий для поста
            var getCommentsToPost = function(vacancy_id, cb) {
                var req = {
                    action:'SetCommentJob',
                    'first': 'vacancies',
                    'second': 'responds',
                    'id': vacancy_id
                };
                PHP_server.Job(req)
                    .then(function(resolve) {
                        //cb(resolve.data);
                    }, function(err) {
                        console.log('Ошибка установки коментария'+err);
                    });
            };

            // удалить коментарии к вакансии
            var removeVacancyComment = function(comment_id, index, vacancy) {
                var req = {
                    action:'DeleteCommentJob'
                };
                PHP_server.Job(req)
                    .then(function(resolve) {
                        //cb(resolve.data);
                        notify({
                            message: 'Вы успешно удалили свой отклик на вакансию',
                            classes: 'alert-success',
                            templateUrl: 'views/dialog/messages.html'
                        });
                    }, function(err) {
                        notify({
                            message: err.message,
                            classes: 'alert-danger',
                            templateUrl: 'views/dialog/messages.html'
                        });
                        console.log('Ошибка получения перечня в работе'+err);
                    });
            };
            // удалить поиск работы
            $scope.cancelSearch = function() {
                $scope.vacancyFilter = {};
                $scope.multiselectModel.model = [];
                $scope.searchVacancy();
            };
                // смотрелка через фильтр
                /*
            $scope.$watch('multiselectModel.filter', function(newValue, oldValue) {
                $scope.loadTags(newValue).then(function(result) {
                    $scope.multiselectModel.data = result;
                });
            });
            */






        }


    ]);
