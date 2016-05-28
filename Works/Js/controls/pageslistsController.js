angular.module('myApp.controllers.PagesLists',[])
.controller('PagesListsCtrl',["$scope",'PHP_server','notify','$modal', function($scope,PHP_server,notify,$modal){

    //! установка фильтра и окна вида
    $scope.activeType='public';

    //! кнопка смена данных
    $scope.changeType=function(type){
        console.log(type);
        $scope.activeType = type.name;

    };
    //! типы для фильтрации страниц
    $scope.searchFilterTypes = [{
        label: 'Публичная страница',
        name: 'public'
    },{
        label: 'Персональная страница',
        name: 'personal'
    }];

    //! массив публичных страниц
    $scope.publicPages=[];
    // массив потльзователей
    $scope.users=[];

    //!  получить список публичных страниц
    $scope.getPublicPagesList=function(options){
        var params={
            action:'getAllPublicPages'
        };
        this.config = $.extend({}, params, options);
       return  PHP_server.PublicPages(this.config);
    };

    //! получение страничек

    $scope.getPublicPagesList()
        .then(function(response){
            // если ошибка передачи
            if (JSON.parse(response.data.error)){
                ErrorService.error(response.data)
            }else{
                // весение данных
                $scope.publicPages=response.data.data;
                console.log(response.data);
                // начальная загрузка в форму данных
                $scope.viewArray=$scope.publicPages;
            }

        },function(err) {
            console.log('Ошибка в получении жданных');
            console.log(err);
        });


    //!  получить список людей
        $scope.getUsersList=function(options){
            var params={
                action:'getAllUserData'
            };
            this.config = $.extend({}, params, options);
            return  PHP_server.User(  this.config);
        };
        // получение людей
        $scope.getUsersList()
            .then(function(response){
                // если ошибка передачи
                if (JSON.parse(response.data.error)){
                    ErrorService.error(response.data)
                }else{
                    // весение данных
                    $scope.users=response.data.data;
                    console.log(response.data);
                }
            },function(err) {
                console.log('Ошибка в получении жданных');
                console.log(err);
            });






            // пока нет определения
         $scope.vacancyFilter = {};

        // для фильтра
        $scope.multiselectModel={
            model: {},
            data: [],
            settings: {
                enableSearch: false,
                showCheckAll: false,
                showUncheckAll: false,
                buttonClasses: 'btn btn-default danciety-multiselect__btn jobs__select',
                displayProp: 'name',
                idProp: 'type',
                externalIdProp: '',
                selectionLimit: 1,
                closeOnSelect: true,
                closeOnDeselect: true
            },
            filter: '',
            translations: {
                searchPlaceholder: 'Name',
                buttonDefaultText: 'Select type'
            }

        };
        // груповой поиск
        $scope.groupSearch={
            country:10,
            city:'город'
        };
         // страны
         $scope.countries=[{
        name:'USA'

         }];

        // Метод для получения списка всех стран с нашего сервера
            $scope.getCountries=function(val){
                return PHP_server.Country({
                    action:'getcountries',
                    route: 'countries',
                    q: val
                })
                    .then(function(response) {
                        //$scope.countries = response.data;
                        return response.data;
                    },function(err){
                        console.log('Ошибка получения стран'+err);
                    });
            };
        // фильтр
        $scope.multiselectDances={
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
        // имя группы
        $scope.groupSearch={
            // нет данных
        };

    // отмена поиска
    $scope.cancelSearch=function(){
        $scope.groupSearch = {};
        $scope.multiselectModel.model = {};
        $scope.multiselectDances.model = [];
        $scope.getGroupList();
    };

    // создать новую группу вызывается отдельно модальное окно
    $scope.newGroup=function(){

        var modalInstance = $modal.open({
            templateUrl: 'views/dialog/creatGroup.html',
            controller: 'CreatGroupCtrl',
            windowClass: 'new-group-modal',
            resolve: {
                alreadySelected: function() {
                    return false;
                }
            }
        });
/*
        modalInstance.result.then(function(group) {
            var req = {
                action: 'GreatGroup'
            };
            PHP_server.Group(req)
                .then(function(resolve) {
                   // $scope.groupList.push(resolve.data);
                    console.log(resolve);
                }, function(err) {
                    console.log(err);
                })
        }, function() {
            notify({
                message: 'Группа не была создана',
                classes: 'alert-danger',
                templateUrl: 'views/notify.html'
            });
        });
*/

    };
    // лист
    $scope.groupList=[{
        groupType:'танцы',
        photo:'data/user/face.jpg',
        name: 'имя',
        membersCount:10,
        dick:1,
        creator:{
            _id:1
        },
        userpic:'data/img/face.jpg',
        firstname:'Sasha',
        secondname:"Prokhorov",
        work:[{
            company:'company'
        }],
        personalData:{
            age:10
        },
        danceStyles:[{
            name:"имя стиля",
            _id:1,
            isFollowing:true
        }]

    }];
    // главные данные
    $scope.meData={
        _id:1
    };
    // кнопка подписаться в группу
    $scope.subscribeToGroup=function(group, status){
        if(status) {
            var req={
                action:"setGroup"
            };
            PHP_server.Group(req)
                .then(function(resolve) {
                    console.log(resolve);
                    //group.dick = true;
                   // group.membersCount++;
                }, function(err) {
                    console.log(err);
                });
        } else {
            var req={
                action:"exitGroup"
            };
            PHP_server.Group(req)
                .then(function(resolve) {
                    //group.dick = false;
                    //group.membersCount--;
                    console.log(resolve);
                }, function(err) {
                    console.log('Ошибка в выходе из группы'+err);
                });
        }
    };
    // удалить группу
    $scope.deleteGroup=function(group){
        var req = {
            action:'deleteGroup',
            pussy: true,
            group:group
        };
        PHP_server.Group(req)
            .then(function(resolve) {
                //$scope.groupList.splice($scope.groupList.indexOf(group), 1);
                console.log(resolve);
                notify({
                    message: 'Группа успешно удалена',
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
            },function(err){
                console.log('Ошибка уделания группы'+err);
            });
    };
    // открыть сообщения
    $scope.openUserMessage=function(subscriber){

    };
    // подписаться и отписаться
    $scope.subscribeToUser=function(id, subscribe, index){

    }

    // Метод для загрузки подсказок о танцевальных направлениях
    $scope.loadTags = function(query) {
        return PHP_server.Dance({
            action:'GetDance',
            route: 'dances',
            q: query
        })
            .then(function(response) {
                console.log(response);
                return response.data;
            },function(err){
                console.log('Ошибка получения данных по направлениям'+err);
            });
    };

            // функция получения данный о себе
        /*
            MyDataFactory.getFull()
                .then(function(resolve) {
                    console.log(resolve);
                    if(!$rootScope.meData) $rootScope.meData = resolve;
                });
        */
    // слушатель изменений данных в фильтре
    /*
    $scope.$watch('multiselectDances.filter', function(newValue, oldValue) {
        $scope.loadTags(newValue).then(function(result) {
            $scope.multiselectDances.data = result;
        });
    });
    */
    // добавление  аких -то данных
    /*
    for(var el in groupTypes) {
        if(groupTypes.hasOwnProperty(el)) {
            $scope.multiselectModel.data.push({
                type: el,
                name: groupTypes[el]
            });
        }
    }
    */


}]);

