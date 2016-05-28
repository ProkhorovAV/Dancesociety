// здесь поставить обработчик ошибок
angular.module('myApp')
    .factory('ErrorService',['notify', function(notify){

        return{
            // простое сообщение
            error:function(options){
                var params={
                    text:'mes',
                    console:'no data'
                }
                this.config = $.extend({}, params, options);
                notify({
                    message: this.config.text,
                    classes: 'alert-danger',
                    templateUrl: 'views/dialog/messages.html'
                });
                console.log(this.config.console);
            },
            // ошибка в получении данных
            handler:function(data){
                switch(data){
                    case'no news':
                        notify({
                            message: 'К сожалению для вас нет новостей',
                            classes: 'alert-danger',
                            templateUrl: 'views/dialog/messages.html'
                        });
                        break;

                }
            }
        }
    }]);