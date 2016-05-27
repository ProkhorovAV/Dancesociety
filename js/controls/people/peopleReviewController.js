 angular.module('myApp.controllers.PeopleReview',[])
 .controller('PeopleReviewCtrl',['$scope','PHP_server','$stateParams',
     function($scope,PHP_server,$stateParams){



     // данные об отзывах
     $scope.reviewsArray={
         data:[{
             author:{
                 _id:1,
                 userpic:'data/user/face.jpg',
                 firstname:"Sasha",
                 secondname:"Prokhorov"
             },
             positive:true,
             created:'12.12.2009',
             text:'text'
         }]
     };


     //! получения отзывов о пользователе
     $scope.getCommentUserOnId=function(){
         var req={
             action:"getCommentUserOnId",
             data:{
                 idPeople:$stateParams.id
             }
         };
         return PHP_server.Comment(req);
     };
     //! получение отзвов о пользователе
     $scope.getCommentUserOnId()
         .then(function(response){

             // если ошибка передачи
             if (JSON.parse(response.data.error)){
                 ErrorService.error(response.data)
             }else{
                 // весение данных
                 $scope.reviewsArray=response.data.data;
             }
         },function(err) {
             console.log('Ошибка в получении жданных');
             console.log(err);
         });




     $scope.meData={
        _id:1
     }
        // открыть страничку
        $scope.user={
            isMyProfile:false
        };
     // отзыв
        $scope.newReview={
            text:'text',
            graduation:'установлено'
        };
     // оставить отзыв
     $scope.newReview = function() {
         var req = {
             action:'addComment',
             route: 'reviews',
             id: $scope.user._id
         }
         /*
         var reqData = {
             text: $scope.newReview.text,
             positive: $scope.newReview.graduation
         }
         */
         PHP_server.Comment(req).then(function(response) {
             notify({
                 message: 'Ваш отзыв успешно добавлен',
                 classes: 'alert-success',
                 templateUrl: 'views/dialog/messages.html'
             });
             //$scope.reviewsList.data.push(response.data.data);
             //$scope.reviewsList.summary = response.data.summary;
             //$scope.newReview.text = '';
         }, function(error) {
             notify({
                 message: 'Неизвестная ошибка. Возможно Вы уже оставляли отзыв об этом человеке',
                 classes: 'alert-danger',
                 templateUrl: 'views/dialog//messages.html'
             });
             console.log(error);
         });
     };
     // колчество тозывов
     $scope.reviewsList={
         summary:{
             total:10,
             positive:4,
             negative:6
         }
     };

     // удалить
     $scope.removeReview = function(index) {
         var req={
             action:'removeComment'
         }
         PHP_server.Comment()
             .then(function(response) {
             notify({
                 message: 'Ваш отзыв успешно удален',
                 classes: 'alert-success',
                 templateUrl: 'views/dialog/messages.html'
             });
                 /*
             if (response.data != null) {
                 $scope.reviewsList.summary = response.data;
             }
             $scope.reviewsList.data.splice(index, 1);
                 */
         }, function(error) {
             console.log(error);
         });
     };
     // получить все отзывы?
     $scope.getAllReviews = function() {
         var req={
             action:'getComment'
         }
         PHP_server.Comment(req).then(function(response) {
             //$scope.reviewsList = response;
             console.log(response);
         },function(err){
             console.log(err);
         });
     }

     $scope.getAllReviews();


 }]);