angular.module('myApp')
.factory('user_dataService', function(){
    var Data={
        id:-1,
        img:'unknow.png',
        background:null,
        firstname:null,
        secondname:null,
        email:null,
        password:null,
        status:0,
        male:false,
        age:null,
        height:null,
        weight:null,
        heirColor:null,
        eyesColor:null,
        nationality:null,
        lastUpdate:null,
        danceStyle:null,
        work:{
            company:null,
            start:null,
            end:null,
            place:null
        },
        stady:{
            univercity:null,
            direction:null,
            start:null,
            end:null,
            degree:null,
            place:null
        },
        created:null,
        preference:[],
        subscribers:[],
        country:null,
        city:null,
        phone:null,
        webside:null,
        addres:null

    };
    var tempint=0;
    return{
        get_id: Data.id,
        get_data:Data,
        SetData:function(data){
            Data=data;

        },
        GetData:function(){
            return Data;
        },
        SetEmail:function(email){
            Data.email=email;
        },
        SetPassword:function(password){
            Data.password=password;
        },
        // возврат id пользователя
        getId:function() {
           return Data.id;
        },
        settemp:function(index){
            tempint=index;
        }
        ,



    }
})