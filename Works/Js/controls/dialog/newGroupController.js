angular.module('myApp.controllers.CreatGroup',[])
    .controller('CreatGroupCtrl',["$scope", function($scope){
            //
            $scope.groupTypes={
                company:'компания',
                organization:'организация',
                entertainment:'развлекательное учреждение',
                studio:'студия',
                pair:'танцевальный дуэт',
                collective:'танцевальный колектив'
            }
            // выбранные данные
            $scope.group={
                name:'',
                groupType:'',
                country:'USA',
                city:'city'

            }
            // закрытие формы
            $scope.cancel=function(){

            }
        $scope.country=[{
            name:"USA"
        }];
        $scope.getCountries=function(index){

        }


    }])
