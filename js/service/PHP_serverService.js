// запросы на сервер
angular.module('myApp.services.PHP_server', [])
    .factory('PHP_server', ['$http', 'SERVER','user_dataService',
        function($http,SERVER,user_dataService ) {


        return{
            // все о пользователе
            User: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,data:data.data}});
            },
            // все о новостях
            Post: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,skip:data.skip,counts:data.counts , userId:user_dataService.getId()}});
            },
            // все о вакансиях
            Vacancy: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action, user_id:user_dataService.get_id}});
            },
            Video: function(data){

                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,counts:data.counts,skip:data.skip, userId:1}});
            },
            // странички и новости
            PublicPages: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action}});
            },




            /************************************/









            Subscribe: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action, user_id:user_dataService.get_id}});
            },
            Save: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action, user_id:user_dataService.get_id}});
            },
            Delete: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action, user_id:user_dataService.get_id}});
            },
            Search: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action, user_id:user_dataService.get_id}});
            },
            Conversations: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action, user_id:user_dataService.get_id}});
            },
            Flowers: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action, user_id:user_dataService.get_id}});
            },
            Helpers: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action, user_id:user_dataService.get_id}});
            },
            Likes: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
            },
            Comment: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
            },
            Worker: function(data){
            return $http({method: 'POST',url: SERVER.DATA,
                data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
            },
            Job: function(data){
            return $http({method: 'POST',url: SERVER.DATA,
                data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
             },
            Photo: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
            },
            Group: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
            },
            Country: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
            },
            Dance: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
            },
            Images: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
            },
            Status: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
            },
            Style: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
            },

            Tag: function(data){
                return $http({method: 'POST',url: SERVER.DATA,
                    data: {action:data.action,data:data.data, user_id:user_dataService.get_id}});
            }




        }
/*
        return $resource(MC.PATH + '/api/:route/:id', {route: '@route', id: '@id'}, {
            'query': {method: 'GET', cache: false, interceptor: ResourceInterceptor},
            //'get': {method: 'GET', cache: false}
            //'userQuery': {method: 'GET', url: MC.PATH + '/api/:route/user/:id/', cache: false, isArray: true, interceptor: ResourceInterceptor},
            //'update': {method: 'PUT', cache: false, interceptor: ResourceInterceptor},
            'save': {method: 'POST',cache: false,  url: MC.PATH + '/api/:route/:id', interceptor: ResourceInterceptor}
            //'delete': {method: 'DELETE', cache: false, interceptor: ResourceInterceptor},
            //'helpers': {method: 'GET', isArray: true, cache: false, url: MC.PATH + '/api/helpers/:route/', interceptor: ResourceInterceptor },
            //'userme': {method: 'PUT', cache: false, url: MC.PATH + '/api/user/me/:route/', interceptor: ResourceInterceptor},
            //'search': {method: 'GET', isArray: true, cache: false, url: MC.PATH + '/api/search/users/', interceptor: ResourceInterceptor},
            //'alien': {method: 'GET', isArray: false, cache: false, url: MC.PATH + '/api/user/id/:id', interceptor: ResourceInterceptor},
            //'getlist': {method: 'GET', isArray: true, cache: false, url: MC.PATH + '/api/:first/:second/:id', interceptor: ResourceInterceptor},
            //'getObject': {method: 'GET', isArray: false, cache: false, url: MC.PATH + '/api/:first/:second/:id', interceptor: ResourceInterceptor},
            //'postlist': {method: 'POST', cache: false, url: MC.PATH + '/api/:first/:second/:id', interceptor: ResourceInterceptor},
            //'deletelist': {method: 'DELETE', cache: false, url: MC.PATH + '/api/:first/:second/:id', interceptor: ResourceInterceptor},
            //'dataFromId': {method: 'GET', isArray: true, cache: false, url: MC.PATH + '/api/user/id/:id/:route/', interceptor: ResourceInterceptor},
            //'savePhoto': {method: 'POST', cache: false, url: MC.PATH + '/api/user/me/:route/', interceptor: ResourceInterceptor},
            //'changeMe': {method: 'PUT', cache: false, url: MC.PATH + '/api/user/me/:route/', interceptor: ResourceInterceptor},
           });
        */
    }]);
