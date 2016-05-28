<?php
header('Access-Control-Allow-Origin: *');

// класс ошибок 
include_once(dirname(__FILE__).'/ErrorClass.php');

// класс проверки данных 
include_once(dirname(__FILE__).'/inspectionClass.php');

// входящие действие
$json=json_decode(file_get_contents('php://input')); 

// проверка вх данных на json
if ($json->action==NULL) exit('Запрос на сервер не содержит данных');

// проверка данных
$inspector=new Inspection(); 
$action = $inspector->ClearData($json->action,'action');
$inspector->CheckLength($action,3,20,'action');   
// создание объекта ответа
$obj=NULL; 
// выбор 
switch ($action) {

//******************People*******************************************////    
         // получение данных по юзеру
         case 'getUserData':
            // класс пользователей
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/userClass.php';
            $obj=new User();
            $email=$inspector->ClearData($json->data->email,'email');           
            $password=$inspector->ClearData($json->data->password,'password');             
            $obj->SetEmailPassword($email,$password);            
            $obj->GetUserData();
         break;
         // получения перечня пользователей
        case 'getAllUserData':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/userClass.php';
            $obj=new User();            
            $obj->GetAllUserData();             
         break;  
        // получения данных о пользователе
        case 'getUserOnId':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/userClass.php';
            $obj=new User(); 
            $idPeople=$inspector->ClearData($json->data->idPeople);
            $inspector->CheckLength($json->data->idPeople,1,3); 
            $obj->SetIdPeople($idPeople);
            $obj->GetUserOnId();           
         break; 
         // получения подписчиков по id пользователю
        case 'getSubscibersOnId':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/userClass.php';
            $obj=new User(); 
            $idPeople=$inspector->ClearData($json->data->idPeople);
            $inspector->CheckLength($json->data->idPeople,1,3); 
            $obj->SetIdPeople($idPeople);
            $obj->GetSubscibersOnId();           
         break;            
         // получения подписки 
        case 'getFollowersOnId':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/userClass.php';
            $obj=new User(); 
            $idPeople=$inspector->ClearData($json->data->idPeople);
            $inspector->CheckLength($json->data->idPeople,1,3);
            $obj->SetIdPeople($idPeople);
            $obj->GetFollowersOnId();           
         break;  
         // получить подписчиков по id page         
          case 'getSubscribersOnIdPage':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/userClass.php';
            $obj=new User(); 
            $idPage=$inspector->ClearData($json->data->idPage);
            $inspector->CheckLength($json->data->idPage,1,3);
            $obj->SetIdPage($idPage);
            $obj->GetSubscribersOnIdPage();           
         break;  
//////////////////////новости//////////////////////////////////////////////////////////////////////////////         
         
         // получение новостей по id user
         case 'getPostDataCountsIdUser':
            // класс пользователей
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/postClass.php';
            $obj=new Post();
            $idPeople=$inspector->ClearData($json->data->idPeople);
            $inspector->CheckLength($json->data->idPeople,1,3);
            $obj->SetIdPeople($json->data->idPeople);
            $obj->GetPostDataCountsIdUser();
         break;
          // получение Top новостей по наибольшим лайкам 
         case 'getTopUserPost':
            // класс новостей
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/postClass.php';
            $obj=new Post();                       
            $obj->GetUserDataTop();
         break;
         // получение новостей от топ пользователей
         case 'getPostFromTopUser':
            // класс новостей
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/postClass.php';
            $obj=new Post();                      
            $obj->GetPostFromTopUser();
         break;
         // получение новостей от сервера  Danciety
          case 'getPostFromDanciety':
            // класс новостей
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/postClass.php';
            $obj=new Post();                       
            $obj->GetPostFromDanciety();
         break;  
          // получение новостей по id публичной страницы
          case 'getPostOnIdPage':
            // класс новостей
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/postClass.php';
            $obj=new Post();
            $idPage=$inspector->ClearData($json->data->idPage);
            $inspector->CheckLength($json->data->idPage,1,3);                     
            $obj->GetPostOnIdPage();
         break;                    
////////////////////////////вакансии//////////////////////////////////////////
          // получение всех вакансий
          case 'getAllVacancy':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/vacancyClass.php';
            $obj=new Vacancy();   
            $obj->GetAllVacancy();             
         break;          
         // получение вакансий по id people
          case 'getVacancyOnId':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/vacancyClass.php';
            $obj=new Vacancy(); 
            $idPeople=$inspector->ClearData($json->data->idPeople);
            $inspector->CheckLength($json->data->idPeople,1,3);      
            $obj->SetUserId($idPeople); 
            $obj->GetVacancyOnId();             
         break; 
         // получение вакансий по id page
          case 'getVacancyOnIdPage':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/vacancyClass.php';
            $obj=new Vacancy();  
            $idPage=$inspector->ClearData($json->data->idPage);
            $inspector->CheckLength($json->data->idPage,1,3); 
            $obj->SetPageId($idPage); 
            $obj->GetVacancyOnIdPage();             
         break; 
/////////////////////////////////видео////////////////////////////         
        // получение видеофайлов по id пользователю
        case 'getVideoOnIdUser':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/videoClass.php';
            $obj=new Video();
            $idPeople=$inspector->ClearData($json->data->idPeople);
            $inspector->CheckLength($json->data->idPeople,1,3);     
            $obj->SetUserId($idPeople);
            $obj->GetVideoOnIdUser();             
         break; 
         // получение видеофайлов по Top пользователtq
        case 'getVideoOnTopUser':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/videoClass.php';
            $obj=new Video();               
            $obj->GetVideoOnTopUser();             
         break; 
            // получение видеофайлов Danciety
        case 'getVideosDanciety':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/videoClass.php';
            $obj=new Video();               
            $obj->GetVideosDanciety();             
         break; 
         
            // получение видеофайлов по id page 
        case 'getPhotoPublicPageOnId':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/videoClass.php';
            $obj=new Video();               
            $obj->GetPhotoPublicPageOnId();             
         break; 
//////////////////////////////////////фотографии/////////////////////////
        // получение всех фотографий
        case 'getAllPhoto':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/photoClass.php';
            $obj=new Photo();            
            $obj->GetAllPhoto();             
         break; 
          // получение всех фотографий по id пользователю
        case 'getAllPhotoOnIdPeople':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/photoClass.php';
            $obj=new Photo();
            $idPeople=$inspector->ClearData($json->data->idPeople);
            $inspector->CheckLength($json->data->idPeople,1,3);  
            $obj->SetUserId($idPeople);            
            $obj->GetAllPhotoOnIdPeople();             
         break; 
         // получение фотографий по id page
         case 'getPhotoPublicPageOnId':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/photoClass.php';
            $obj=new Photo();
            $idPage=$inspector->ClearData($json->data->idPage);
            $inspector->CheckLength($json->data->idPage,1,3);  
            $obj->SetIdPage($idPage);          
            $obj->GetPhotoPublicPageOnId();             
         break; 
/////////////////////////////////публичные страницы////////////
        // получение всех публичных страниц
        case 'getAllPublicPages':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/publicClass.php';
            $obj=new PublicPages();            
            $obj->GetAllPublicPages();             
         break; 
         // получение всех публичных страниц по id people
        case 'getAllPublicPagesOnIdPeople':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/publicClass.php';
            $obj=new PublicPages();
            $idPeople=$inspector->ClearData($json->data->idPeople);
            $inspector->CheckLength($json->data->idPeople,1,3); 
            $obj->SetUserId($idPeople);             
            $obj->GetAllPublicPagesOnIdPeople();             
         break; 
        // получение данных по публичной странице
        case 'getPublicPageOnId':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/publicClass.php';
            $obj=new PublicPages();
            $obj->SetPageId($json->data->idPage);             
            $obj->GetPublicPageOnId();             
         break;           
/////////////////////////комментарии/////////////////////////////
         // получение всех публичных страниц
        case 'getCommentUserOnId':           
            include_once $_SERVER['DOCUMENT_ROOT'].'/data/Server/commentClass.php';
            $obj=new Comment(); 
            $obj->SetUserId($json->data->idPeople);       
            $obj->GetCommentUserOnId();             
         break; 
 
}
if ($obj==NULL){
    echo ('Нет определения для функции. Запрос на '.$action);
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
function ThrowErr($value)
{
    echo($value);
    exit();
}
?>