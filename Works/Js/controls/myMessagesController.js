angular.module("myApp.controllers.MyMessages", [])
    .controller("MyMessagesCtrl", [
        "$scope",'PHP_server',
        function ($scope,PHP_server) {
            console.log("MyMessagesCtrl");
            // перечень иконок
            $scope.allConversations=[{
                opponent:{
                    firstname:"Sasha",
                    secondname:"Prokhorov",
                    userpic:'data/user/face.jpg'
                }
            }];
            // клик по иконке и получение результатов собеседывания
            $scope.getConversation=function(conversation, index){
                var req = {
                    action:'getConversations',
                    route: 'conversations',
                    id: conversation._id
                };
                PHP_server.Conversations(req)
                    .then(function (response) {
                        console.log(response);
                        //response.data = response.data.reverse();
                        //$scope.allConversations[index].messages = response.data;
                        //$scope.currentConverstions = conversation;
                        //$scope.$broadcast('refresh', {});
                        // if (objects.length > 0){
                        //     $timeout(addToList, 1000);
                        // }
                        //$scope.currentConverstions.messages = response.data;
                    });
            };
            // диалоговое окно
            $scope.currentConverstions={
                opponent:{
                    firstname:"Sasha",
                    secondname:"Prokhorov",
                    isOnline:true,
                    isOnline:true
                },
                messages:[{
                    from_id:1,
                    from:{
                        userpic:'data/use/face.jpg'
                    },
                    text:'Текст',
                    created:'12.12.2005'

                }],
                newMessage:""
            };
            // закрыть бар
            $scope.closeConversation=function(){
                $scope.currentConverstions = undefined;
            };

            // отправка сообщений
            $scope.sendMessage=function(currentConverstions, index){
                MySocketFactory.emit('message:send', {
                    conversation: conversation._id,
                    text: conversation.newMessage,
                    photos: []
                });
                //$scope.allConversations[index].messages.push({
                //    from: $scope.meData,
                //    text: conversation.newMessage,
                //    photos: [],
                //    created: new Date()
                //});
               // conversation.newMessage = "";
            }
            // получить все разговоры
            var getAllConversations = function () {
                var req = {
                    action:'getAllConversations',
                    route: 'conversations'
                };
                return PHP_server.Conversations(req);

            };
            getAllConversations()
                .then(function (response) {
                console.log(response.data);
                /*
                response.data.map(function (el) {
                    if(el.users[0]._id == $rootScope.meData._id) {
                        el.opponent = el.users[1];
                    } else {
                        el.opponent = el.users[0];
                    }
                    return el;
                });
                    */
                //$scope.allConversations = response.data;
            });
            // Получить все цветочки
            var getAllFolowers = function () {
                var req = {
                    action:'getFlovers',
                    route: 'followers'
                };
                return PHP_server.Flowers(req);
            }

            getAllFolowers()
                .then(function (response) {
                    console.log(response.data);
                    //$scope.followers = response.data;
                    //$scope.followers.push($scope.meData);
                });
            // сохранить сообщение
            /*
            $rootScope.sentUserMessage = function (user, message, index) {
                var req = {
                    route: 'conversations',
                    id: 'user'
                }
                var data = {
                    to: user._id,
                    text: message,
                    photos: []
                }
                RestApi.save(req, data).$promise
                    .then(function (response) {
                    });
            }
            */
            // получить сообщение
            /*
            MySocketFactory.on('message:receive', function (data) {
                $scope.allConversations.map(function (el, index) {
                    if(data.conversation === el._id) {
                        if(!el.messages) {
                            el.messages = [];
                        }
                        el.messages.push(data);
                        if($rootScope.meData._id === data.from._id) return ;
                        $rootScope.newMessageSound.play();
                        notify({
                            message: data.text,
                            classes: 'alert-info'
                        });
                        el.lastMessage.text = data.text;
                    }
                });
            });
            */

        }
    ]);
