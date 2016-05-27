<?php
include_once(dirname(__FILE__).'/Connection.php');
include_once(dirname(__FILE__).'/packageClass.php'); 
include_once(dirname(__FILE__).'/querySQLClass.php'); 
//include $_SERVER['DOCUMENT_ROOT'].'/data/Php/Connection.php';
// соединение с базой SQL
$connectionBase = mysql_connect($hostBase,$userBase,$passwordBase);
// условия ошибки и выхода

if ((!$connectionBase)||(!mysql_select_db($dbBase,$connectionBase)))
{exit(mysql_error());}
mysql_query('SET NAMES utf8');
// проверка класса
  /*  
$json=json_decode(file_get_contents('php://input'));
$obj=new User();
$data=$json->data;
// получить данные по пользователю о поролю и логину
//$obj->SetData($data);
//$obj->GetUserData();
// получить всех пользователей
//$obj->getAllUserData();
// получить пользователя
//$obj->SetIdPeople($json->data->idPeople);
//$obj->getUserOnId();
// получить подписчики
//$obj->SetIdPeople($json->data->idPeople);
//$obj->getSubscibersOnId();
// получиь на кого подписан пользователь
//$obj->SetIdPeople($json->data->idPeople);
//$obj->getFollowersOnId();
// получить подписчиков по id page
$obj->SetIdPage($json->data->idPage);
$obj->getSubscribersOnIdPage(); 
echo json_encode($obj->SendData());
   
 */
// данные по пользователю
class User{
// id публичная страница
private $idPage=NULL;
private $email=NULL;
private $password=NULL;
// упаковка
private $packege=NULL;
// id пользователя
private $idPeople=NULL;



private $id_user=NULL;
private $firstName=NULL;
private $secondName=NULL;
private $query=NULL;
private $sendArrayData=NULL;
private $stringQuery=NULL;
private $row=NULL;

// пересенная установлена - есть ошибка по умолчанию
private $statusErr=true;
 
        // получить данные по пользователю по поролю и логину
        public function GetUserData(){

            // получение пользователя если он есть 
            $row=$this->GetUserOnEmailPassword();
            if ($row['Id']==NULL){
               $this->statusErr=true;
               $this->sendArrayData='userNoUser';

            }else{
                $this->statusErr=false;

                // упаковка данных пользователя
                $this->sendArrayData=$this->packege->people($row);
            }           
        }

        // получить все данные о пользователях
        public function GetAllUserData(){

                // получить всех пользователе
                $arrayUsers=$this->GetDataAllUsers();

                // сформировать сили
                $arrayUsers=$this->packege->styles($arrayUsers);

                // все получилось
                $this->statusErr=false;

                // отправляем данные
                $this->sendArrayData=$arrayUsers;

        }

        // получить данные по пользователю
        public function GetUserOnId(){
                // получить пользователя
                $arrayUsers=$this->GetDataOnIdPeople();
                 // формирования работы
                $arrayUsers=$this->packege->work($arrayUsers);
                // формирования учебы
                $arrayUsers=$this->packege->study($arrayUsers);
                // сформировать сили
                $arrayUsers['danceStyle']=$this->packege->arrayData($arrayUsers,'danceStyle');
                // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayUsers;
        }
        // получение подписчиков
        public function GetSubscibersOnId(){
                // получить id подписчиков по id пользователю
                $arrayUsers=$this->GetDataRepostOnIdPeople();
                // расшифровка подписчиков
                $arrayUsers=$this->GetDataRepost($arrayUsers);    

                // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayUsers;
        }

         // получение на кого подписан пользоватеь
        public function GetFollowersOnId(){
                // получить id подписчиков по id пользователю
                $arrayUsers=$this->GetDataFollowersOnIdPeople();
                // расшифровка подписчиков
                $arrayUsers=$this->GetDataRepost($arrayUsers);    

                // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayUsers;
        }

        // получение подписчиков по id page
        public function GetSubscribersOnIdPage(){
            // получить id подписчиков по id пользователю
                $arrayUsers=$this->getSubscribersOnIdPageData();
               

                // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayUsers;
          
        }


    // дополнительные  функции/////////////

        // установить данные по почта и пароль
        public function SetEmailPassword($_email,$_password){             
            $this->email=$_email;
            $this->password=$password;
            return true
        }

        // получение потльзователя по логину и паролю 
        public function GetUserOnEmailPassword(){
            
            // строка запроса
            $stringQuery="SELECT * FROM Peoples WHERE (Email='$this->email') and (Password='$this->password')";
            
            // запрос
            $query = mysql_query($stringQuery);
            
            // получение первой строки
            $row = mysql_fetch_array($query);
           
            return $row;  
        }

       // получение всех пользователей
        public function GetDataAllUsers(){
                
                // массив пользователей
                $postArray=array();
                
                // строка запроса
                $stringQuery="SELECT * FROM Peoples";
                
                // запрос
                $query = mysql_query($stringQuery);
               
                // получение первой строки
                $row = mysql_fetch_array($query);
                do {
                    $postRow=$this->packege->people($row);                                                                                              
                    
                     // добавление в массив и сформировали ответ по новостям
                    array_push($postArray,$postRow);
                } while($row = mysql_fetch_array($query)); 

            return $postArray;
        }
          
        
        // установить id  пользователя
        public function SetIdPeople($_id){
            $this->idPeople=$_id;
        } 
        // данные по id юзеру
        public function GetDataOnIdPeople(){                
                // строка запроса
                $stringQuery="SELECT * FROM Peoples WHERE Id=$this->idPeople";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                $postRow=$this->packege->people($row);

            return $postRow;                 
        }
             // получить id подписчиков по id пользователю
        public function GetDataRepostOnIdPeople(){
                // строка запроса
                $stringQuery="SELECT Reposts FROM People WHERE Id=$this->idPeople";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                $reposts=$this->packege->arrayData($row,'Reposts');               
            return $reposts;
        }
        // расшифровка по пользователям
        public function GetDataRepost($_arrayPosts){
                // запрос 
                $stringQuery="SELECT * FROM People WHERE Id IN (".implode(",", $_arrayPosts).")";
                // запрос
                $query = mysql_query($stringQuery);
                // получение данных
                $row = mysql_fetch_array($query);
                // массив комментариев
                $arrayComment=array();
                 do {
                        $postRow=$this->packege->people($row);
                        // добавление в массив  
                        array_push($arrayComment,$postRow);
                    } while($row = mysql_fetch_array($query));
            return $arrayComment;

        }
         // получить  подписчики
        public function GetDataFollowersOnIdPeople(){
                // строка запроса
                $stringQuery="SELECT Id, Reposts FROM Peoples";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                // массив подписок
                $followersArray=array();
                  do {
                        $repost=$this->arrayData($row,'Reposts');
                        // для каждого совпадения по id вносить данные                     
                        foreach ($reposts as &$value) {
                           if($value==$this->idPeople){
                              array_push($followersArray, $row['Id']);
                           }
                        }                       
                    } while($row = mysql_fetch_array($query)); 

            return $followersArray;
        }
         // установить id page 
        public function SetIdPage($_idPage){
            $this->idPage=$_idPage;
        }
        // получить данные по подписчикам
        public function getSubscribersOnIdPageData(){
     
            $postArray=array();
            // запрос на все вакансии
            $stringQuery="SELECT * FROM PublicPages WHERE Id=$this->idPage";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
             // объект с данными 
            $posts=$this->packege->arrayData($row,'Reposts');            
            // сохранение данных о публичной странице
            $PublicPage=$row;            
            // запрос на все вакансии
            $stringQuery="SELECT * FROM Peoples WHERE Id IN (".implode(",", $posts).")";           
            // запрос             
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            do {
                $postRow= $this->packege->people($row);
                // добавление в массив и сформировали ответ по новостям
                ($postArray,$postRow);
            } while($row = mysql_fetch_array($query));
                // компановка данных
            $megaData=$this->packege->publicPage($postArray,'people',$PublicPage);
           
            return $megaData;

        }
  

    /////////////// функции обязательные для всех

     // конструктор
        public function __construct(){
            // для упаковки
             $this->packege=new Pack();
        }

        // возврат ошибок
        public function GetStatusError(){
            return $this->statusErr;
        }

        // отправка ответа самый конец
        public function SendData(){
            return $this->sendArrayData;
        }

}



?>