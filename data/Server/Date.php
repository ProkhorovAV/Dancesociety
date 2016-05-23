<?php
header('Access-Control-Allow-Origin: *');
// класс ошибок
include_once(dirname(__FILE__).'/ErrorClass.php');
// убрать
include $_SERVER['DOCUMENT_ROOT'].'/data/Server/videoClass.php';

$action=$_POST["action"];
// проверка вх данных на json
if ($action==NULL){
    $json=json_decode(file_get_contents('php://input'));
} else{
    exit('не верный запрос');
}
// выбор
$obj=NULL;
$action=$json->action;
switch ($action) {
         // получение данных по юзеру
         case 'getUserData':
            // класс пользователей
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/userClass.php';
            $obj=new User();
            $data=$json->data;
            $obj->SetData($data);
            $obj->GetUserData();
         break;
         // получение новостей по id user
         case 'getPostDataCountsIdUser':
            // класс пользователей
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/postClass.php';
            $obj=new Post();
            $obj->SetSkip($json->skip);
            $obj->SetCount($json->counts);
            $obj->SetUserId($json->userId);
            $obj->GetUserDataIdUser();
         break;
          // получение Top новостей по наибольшим лайкам 
         case 'getTopUserPost':
            // класс новостей
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/postClass.php';
            $obj=new Post();
            $obj->SetSkip($json->skip);
            $obj->SetCount($json->counts);            
            $obj->GetUserDataTop();
         break;
         // получение новостей от топ пользователей
         case 'getPostFromTopUser':
            // класс новостей
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/postClass.php';
            $obj=new Post();
            $obj->SetSkip($json->skip);
            $obj->SetCount($json->counts);            
            $obj->GetPostFromTopUser();
         break;
         // получение новостей от сервера  Danciety
          case 'getPostFromDanciety':
            // класс новостей
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/postClass.php';
            $obj=new Post();
            $obj->SetSkip($json->skip);
            $obj->SetCount($json->counts);            
            $obj->getPostFromDanciety();
         break;

          



         case 'getvideo': $obj=new Video($user_id); break; // как используется в главной так и в видео страничке
         case 'getSubscribers'; $obj=new VideoSubscribers($user_id); break;
         case 'getTopUserVideo'; $obj=new getTopUserVideo($user_id); break;
         case 'subscribe'; break;
         case 'unsubscribe'; break;
         case 'SetPublicPost'; break;
         case 'SetComment'; break;
         case 'deleteComment'; break;
         case 'likePost'; break;
         case 'dislikePost'; break;
         case 'searchHeder'; break;
         case 'getConversations'; break;
         case 'getAllConversations'; break;
         case 'getFlovers'; break;
         case 'gethelper'; break;
         case 'LikesVacancy'; break;
         case 'disLikesVacancy'; break;
         case 'newComment'; break;  // добавить новый комментарий на вакансию
         case 'WorksJob'; break;
         case 'SetJob'; break; //оставить вакансию на своей странички
         case 'SetCommentJob'; break; // установить коментарии на работу
         case 'DeleteCommentJob'; break; // удалить коментарии на работу
         case 'likeVideo'; break; // лайкнуть видео
         case 'dislikeVideo'; break; // не лайкнуть видео
         case 'getPhoto'; break; // получить перечень фото на страничке фото
         case 'LikePhoto'; break; // лайкнуть фото на страничке фото
         case 'disLikePhoto'; break; // не лайкнуть фото на страничке фото
         case 'deleteGroup'; break; // удаление группы от пользователя
         case 'setGroup'; break; // подпиаться в группу
         case 'exitGroup'; break; // уйти из группы
         case 'GetGroup'; break; // получить список групп по поиску
         case 'getcountries'; break; // получить списка городов
         case 'GetDance'; break; // получить списка танцевальных направлений
         case 'GetAllGroup'; break; // получить все группы
         case 'ChangStatus'; break; // смена статуса в группе
         case 'GetAllStyle'; break; // получить все стили
         case 'ChangInformationUser'; break; // смена информации о пользователе
         case 'GetTags'; break; // получение тегов по танцевальному
         case 'GetGrouponId'; break; // получение группы по id
         case 'removePost'; break; // удалить пост
         case 'shatePost'; break; // новости пост
         case 'shatAllPostGroup'; break; //  получить новости группы
         case 'newPost'; break; //  получить новости группы
         case 'GetVacancyGrooup'; break; //  получить вакансии группы
         case 'deleteVacancyComment'; break; //  удалить коментарии вакансию из группы
         case 'deleteVacancy'; break; //  удалить вакансию из группы
         case 'createNewVacancy'; break; //  удалить вакансию из группы
         case 'getComment'; break; //  получить коментари по вакансии
         case 'shareVacancy'; break; //  получить коментари по
         case 'GetSubscribe'; break; //  получить подписчиков
         case 'setSubscribe'; break; //  подписаться на пользователя
         case 'unsetSubscribe'; break; //  отписаться на пользователя
         case 'removePhoto'; break; //  удалить фото
         case 'removeVideo'; break; //  удвлить видео
         case 'sendStyle'; break; //  установить стиль
         case 'changWorks'; break; //  сменить работу
         case 'changeStudy'; break; //  сменить учебное заведение
         case 'changePreferences'; break; //  сменить changePreferences
         case 'getWorker'; break; //  сменить changePreferences
         case 'removeComment'; break; //  сменить удалить коментарий
         case 'addComment'; break; //  добавить коментарий
         case 'getAllPost'; break; //  добавить получить все новости
         case 'likeImages'; break; //  лайкнуть картинку
         case 'dislikeImages'; break; //  не лайкнуть картинку
         case 'getAllImages'; break; //  загрузить все картнки
         case 'newVacancyComment '; break; //  откликнуться на вакансию
         case 'removeVacancyComment '; break; //  отписаться от вакансии
         case 'removeVacancy '; break; //  удалить  вакансию
         case 'helper '; break; // загрузка помощи
         case 'gelAllvacancy '; break; // загрузка помощи
         case 'uploadVideo '; break; // загрузка видео
         case 'unsetGroup '; break; // удалится из группы
}
if ($obj==NULL){
    echo ('Нет определения функции. Запрос на '.$action);
} else {
    $sendMessages=array();
    // если статус без ошибок false с ошибками true
    if ($obj->GetStatusError()){
        // вывести сообщение об ошибке которое формируется в классе ErrorClass
        $error=new Error();
        $sendMessages=array(
        "error"=>"true",
        "data"=>$error->SendData($obj->SendData())
        );
    }else{
        $sendMessages=array(
            "error"=>"false",
            "data"=>$obj->SendData()
        );

    }
    echo json_encode($sendMessages);

}
?>