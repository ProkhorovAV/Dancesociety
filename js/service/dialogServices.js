angular.module('myApp')
    .factory('DialogsService',['notify', function(notify){

        return{
            messges_ok:function(options){
                var params={
                    text:'mes'

                }
                this.config = $.extend({}, params, options);
                notify({
                    message: this.config.text,
                    classes: 'alert-success',
                    templateUrl: 'views/dialog/messages.html'
                });
            }
        }
    }]);