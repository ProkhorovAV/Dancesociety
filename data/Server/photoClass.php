<?php
//
//     
//     
//       

include_once(dirname(__FILE__).'/Connection.php');
include_once(dirname(__FILE__).'/packageClass.php');  
// соединение с базой SQL
$connectionBase = mysql_connect($hostBase,$userBase,$passwordBase);
// условия ошибки и выхода

if ((!$connectionBase)||(!mysql_select_db($dbBase,$connectionBase)))
{exit(mysql_error());}
mysql_query('SET NAMES utf8');
/***** тест класса********/
   /*
$json=json_decode(file_get_contents('php://input'));
$obj=new Photo();
 
// получение фото
//$obj->getAllPhoto();
// получение все фото по id people
$obj->SetUserId($json->data->idPeople);            
$obj->getAllPhotoOnIdPeople();    

echo json_encode($obj->SendData());
  */

/******коней теста*******/

// данные по пользователю
class Photo{
    // id page
    private $idPage=NULL;
    // id пользователя
    private $idUser=NULL;
    // упаковка
    private $packege=NULL;
    // отправка данных
    private $sendArrayData=array();
    // пересенная установлена - есть ошибка по умолчанию
    private $statusErr=true;

        // получить все фотографии
         public function GetAllPhoto(){
                 // получить все id user top
                $arrayVacancy=$this->getAllPhotoData();
                // распоковать автора
                $arrayVacancy=$this->SetAutorInPost($arrayVacancy);
                    // распоковать лайков
                $arrayVacancy=$this->SetLikesArray($arrayVacancy);
                    // распоковать репостов
                $arrayVacancy=$this->SetRepostArray($arrayVacancy); 
                // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayVacancy;

            }
        // получить все фотографии по id пользователю
        public function GetAllPhotoOnIdPeople(){
                 // получить все id user top
                $arrayVacancy=$this->getAllPhotoDataOnIdPeople();
                // распоковать автора
                //$arrayVacancy=$this->SetAutorInPost($arrayVacancy);
                    // распоковать лайков
                $arrayVacancy=$this->SetLikesArray($arrayVacancy);
                    // распоковать репостов
                $arrayVacancy=$this->SetRepostArray($arrayVacancy); 
                // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayVacancy;

           }
            // получения фотографий по id page
            public function GetPhotoPublicPageOnId(){
                // получить все id user top
                $arrayVacancy=$this->getPhotoPublicPageOnIdData();
                // распоковать автора
                //$arrayVacancy=$this->SetAutorInPost($arrayVacancy);
                    // распоковать лайков
                //$arrayVacancy=$this->SetLikesArray($arrayVacancy);
                    // распоковать репостов
                //$arrayVacancy=$this->SetRepostArray($arrayVacancy); 
                // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayVacancy;

            }


 

   ///////////////////// дополнительные функции////////
        // получить все фото
        public function getAllPhotoData(){
                
            $postArray=array();
            // запрос на все вакансии
            $stringQuery="SELECT * FROM Photos";            
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            // объект с данными 
            do {
                $postRow= $this->packege->photo($row);
                // добавление в массив и сформировали ответ по новостям
                array_push($postArray,$postRow);
            } while($row = mysql_fetch_array($query));
            return $postArray;
        }

        // распокавать автора
        public function SetAutorInPost($_arrayPosts){ 
           
                // расщепление массива авторов          
                 for ($i=0; $i <count($_arrayPosts) ; $i++) {   

                    $idAutors=$_arrayPosts[$i]['autor'];
                    // строка запроса
                    $stringQuery="SELECT * FROM Peoples WHERE Id=$idAutors";
                    // запрос
                    $query = mysql_query($stringQuery);
                    // получение данных
                    $row = mysql_fetch_array($query);
                    $_arrayPosts[$i]['autor']=$this->packege->people($row);
                 } 
                return  $_arrayPosts;
        }
        // формирования массива лайков
        public function SetLikesArray($_arrayPosts){
            $_arrayPosts=$this->packege->arrayDataName($_arrayPosts,'likes');
             
            return $_arrayPosts;     
        }
        // формирования массива репостов
        public function SetRepostArray($_arrayPosts){
             $_arrayPosts=$this->packege->arrayDataName($_arrayPosts,'repost');
            
            return $_arrayPosts;     
        }

           // получить все фотографии по id пользователю
         public function getAllPhotoDataOnIdPeople(){
                        
                    $postArray=array();
                    // запрос на все вакансии
                    $stringQuery="SELECT * FROM Photos WHERE Autor=$this->idUser";            
                    // запрос
                    $query = mysql_query($stringQuery);
                    // получение первой строки
                    $row = mysql_fetch_array($query);
                    // объект с данными 
                    do {
                        $postRow=$this->packege->photo($row);
                        // добавление в массив и сформировали ответ по новостям
                        array_push($postArray,$postRow);
                    } while($row = mysql_fetch_array($query));
                    return $postArray;
         }
 
        // получить по id page все фотографии            
        public function getPhotoPublicPageOnIdData(){
            $postArray=array();
            // запрос на все вакансии
            $stringQuery="SELECT * FROM PublicPages WHERE Id=$this->idPage";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
             // объект с данными 
            $posts=$this->packege->arrayData($row,'Photo');            
            // сохранение данных о публичной странице
            $PublicPage=$row;            
            // запрос на все вакансии
            $stringQuery="SELECT * FROM Photos WHERE Id IN (".implode(",", $posts).")";           
            // запрос             
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);

            do {
                $postRow=$this->packege->photo($row);
                // добавление в массив и сформировали ответ по новостям
                array_push($postArray,$postRow);
            } while($row = mysql_fetch_array($query));
            $megaData=$this->packege->publicPage($postArray,'photos',$PublicPage);    
  
            return $megaData;
        }
  
        // установить id пользователя
        public function SetUserId($_idUser){
                $this->idUser=$_idUser;

        }
         // установить id page 
        public function SetIdPage($_idPage){
            $this->idPage=$_idPage;
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