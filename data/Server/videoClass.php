<?php
//
//     
//     
//       

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
/***** тест класса********/
 /*
$json=json_decode(file_get_contents('php://input'));
$obj=new Video();
$obj->SetUserId($json->userId); 
// получение видео по id
//$obj->getVideoOnIdUser(); 
// получение видео от топ пользователей 
//$obj->getVideoOnTopUser(); 
// получить видео danciety
$obj->getVideosDanciety();

echo json_encode($obj->SendData());
  */

/******коней теста*******/

// данные по пользователю
class Video{
    // id пользователя
    private $idUser=NULL;
    $packege=NULL;
    // для запросов
    $querySQL=NUL;
    private $idPeople=NULL;
    // отправка данных
    private $sendArrayData=array();
    // пересенная установлена - есть ошибка по умолчанию
    private $statusErr=true;

    // получение всех вакансий
    public function GetVideoOnIdUser(){
        // получить все видео
        $arrayVacancy=$this->GetVideoDataOnId();
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
    // получение видео от топ пользователей
    public function GetVideoOnTopUser(){
         // получить все id user top
        $arrayVacancy=$this->GetTopUserOnVideo();
        // получить все видео
        $arrayVacancy=$this->GetOneVideoDataOnIdUser($arrayVacancy);
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
    // получить видео Danciety
    public function GetVideosDanciety(){
        // получить все видео
        $arrayVacancy=$this->GetAllVideo();
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
     // получить видео по id page
    public function GetPhotoPublicPageOnId(){
         // создать функцию

    }

   ///////////////////// дополнительные функции////////
         // получить все видео
        public function GetVideoDataOnId(){
            // видео   
            $postArray=array();
            // запрос на все вакансии
            $stringQuery="SELECT * FROM Videos where Autor='$this->idPeople'";            
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            // объект с данными 
            do {
                $postRow=$this->packege->video($row);
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
        // получиь топ юзеров
        public function GetTopUserOnVideo(){
                 // строка запроса на вычисления подписчиков
                $stringQuery="SELECT Id, Reposts FROM Peoples";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                // объект с данными по id Peopele и Reposts
                $peopleSubObj=array();
                // цикл проверки всех пользователей и внесения id подписчиков в массив
                do {
                        $subUserArray=$this->packege->arrayData($row,'Reposts');                        
                        // создать массив с данными  для id новостей               
                        $peopleSubObj[$row['Id']]=count($subUserArray);                          
                } while($row = mysql_fetch_array($query));
                // сортировать пользователей           
                arsort($peopleSubObj);
                //
                $postResultArray=array();
                // вставить в массив id пользователей
                foreach ($peopleSubObj as $key => $value) {
                    array_push($postResultArray, $key);
                }     
            return $postResultArray;
         }
        // получить одно видео по топ пользователей
        public function GetOneVideoDataOnIdUser($_array){

            $resultVideo=array();
            for ($i=0; $i < count($_array) ; $i++) {                    
                
                // строка запроса на вычисления подписчиков
                $stringQuery="SELECT * FROM Videos where Autor=$_array[$i]";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);               
                // условие при котором у пользователя есть видео
                if ($row['Id']!=NULL){
                     $postRow=$this->packege->video($row);
                    array_push($resultVideo, $postRow);  
                }               
            }
            return $resultVideo;
        
        }
        // все видео
        public function GetAllVideo(){
            // видео   
            $postArray=array();
            // запрос на все вакансии
            $stringQuery="SELECT * FROM Videos";            
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            // объект с данными 
            do {
                $postRow=$this->packege->video($row);
                // добавление в массив и сформировали ответ по новостям
                array_push($postArray,$postRow);
            } while($row = mysql_fetch_array($query));
            return $postArray;
        }

   
        // установить id пользователя
        public function SetUserId($_idPeople){
                $this->idPeople=$_idPeople;

        }
 

/////////////// функции обязательные для всех

        // конструктор
        public function __construct(){
             // для упаковки
             $this->packege=new Pack();
             // для запросов
             $this->querySQL=new QuerySQL();
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