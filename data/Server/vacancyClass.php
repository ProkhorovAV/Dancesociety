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

$obj=new Vacancy();
// получение всех вакансий
//$obj->GetAllVacancy(); 
// поучение вакансий по id
//$obj->SetUserId($json->data->idPeople); 
//$obj->getVacancyOnId();    
// получение вакансий по id page  
$obj->SetPageId($json->data->idPage); 
$obj->getVacancyOnIdPage();

echo json_encode($obj->SendData());
*/  

/******коней теста*******/

// данные по пользователю
class Vacancy{
    // id page
    private $idPage=NULL;
     // id пользователя
    private $idUser=NULL;
     // для упаковки
    private $packege=NULL;
    // для запросов
    private $querySQL=NULL;

    // отправка данных
    private $sendArrayData=array();
    // пересенная установлена - есть ошибка по умолчанию
    private $statusErr=true;

    // получение всех вакансий
    public function GetAllVacancy(){
        // получить все вакансии
        $arrayVacancy=$this->GetVacancyData();
        //  сформировать пользователя
        $arrayVacancy=$this->SetAutorInPost($arrayVacancy);
        //  расщипить коментарии
        $arrayVacancy=$this->SetCommentsArray($arrayVacancy);
        // расщипить видео
        $arrayVacancy=$this->SetVideoArray($arrayVacancy);
        // расщипиь фото
        $arrayVacancy=$this->SetPhotoArray($arrayVacancy);
        // рсщипить подписки
        $arrayVacancy=$this->SetRepostArray($arrayVacancy);
        // расщипить лайки
         $arrayVacancy=$this->SetLikesArray($arrayVacancy);
         // расщипить стили
        $arrayVacancy=$this->SetStyleArray($arrayVacancy);
 
        // все получилось
        $this->statusErr=false;
        // отправляем данные
        $this->sendArrayData=$arrayVacancy;
 
    }
     // получение   вакансий по id people
    public function GetVacancyOnId(){
        // получить все вакансии
        $arrayVacancy=$this->GetVacancyDataOnIdPeople();
        //  сформировать пользователя
        $arrayVacancy=$this->SetAutorInPost($arrayVacancy);
        //  расщипить коментарии
        $arrayVacancy=$this->SetCommentsArray($arrayVacancy);
        // расщипить видео
        $arrayVacancy=$this->SetVideoArray($arrayVacancy);
        // расщипиь фото
        $arrayVacancy=$this->SetPhotoArray($arrayVacancy);
        // рсщипить подписки
        $arrayVacancy=$this->SetRepostArray($arrayVacancy);
        // расщипить лайки
         $arrayVacancy=$this->SetLikesArray($arrayVacancy);
         // расщипить стили
        $arrayVacancy=$this->SetStyleArray($arrayVacancy);
 
        // все получилось
        $this->statusErr=false;
        // отправляем данные
        $this->sendArrayData=$arrayVacancy;

    }
    // получение ваканси по id page
    public function GetVacancyOnIdPage(){
        // получить все вакансии
        $arrayVacancy=$this->GetVacancyDataOnIdPage();
        //  сформировать пользователя
        $arrayVacancy['vacancy']=$this->SetAutorInPost($arrayVacancy['vacancy']);
        //  расщипить коментарии
        $arrayVacancy['vacancy']=$this->SetCommentsArray($arrayVacancy['vacancy']);
        // расщипить видео
        $arrayVacancy['vacancy']=$this->SetVideoArray($arrayVacancy['vacancy']);
        // расщипиь фото
        $arrayVacancy['vacancy']=$this->SetPhotoArray($arrayVacancy['vacancy']);
        // рсщипить подписки
        $arrayVacancy['vacancy']=$this->SetRepostArray($arrayVacancy['vacancy']);
        // расщипить лайки
         $arrayVacancy['vacancy']=$this->SetLikesArray($arrayVacancy['vacancy']);
         // расщипить стили
        $arrayVacancy['vacancy']=$this->SetStyleArray($arrayVacancy['vacancy']);
 
        // все получилось
        $this->statusErr=false;
        // отправляем данные
        $this->sendArrayData=$arrayVacancy;

    }
///////////////////// дополнительные функции////////
        
   // получить все вакансии
        public function  GetVacancyData(){
            // вакансии   
            $postArray=array();
            // запрос на все вакансии
            $stringQuery="SELECT * FROM Vacancy";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            // объект с данными 
            do {
                    $postRow=$this->packege->vacancy($row);                        
                        // добавление в массив и сформировали ответ по новостям
                 array_push($postArray,$postRow);
            } while($row = mysql_fetch_array($query));
            return $postArray;
        }
        // распокавать автора
        public function SetAutorInPost($_arrayPosts){
  
                 $_arrayPosts=$this->querySQL->openDataOnAutor($_arrayPosts);
                return  $_arrayPosts;
        }
        // формирование массива коментариев
        public function SetCommentsArray($_arrayPosts){   
                     
            $_arrayPosts= $this->querySQL->openArrauData($_arrayPosts,'Comments');    
                
            return $_arrayPosts;            
        }      

        // формирование массива видео
        public function SetVideoArray($_arrayPosts){                 
                             
            $_arrayPosts= $this->querySQL->openArrauData($_arrayPosts,'Videos');  

            return $_arrayPosts;            
        }   

        // формирование массива фотографий
        public function SetPhotoArray($_arrayPosts){  
           
            $_arrayPosts= $this->querySQL->openArrauData($_arrayPosts,'Photos');  
           
            return $_arrayPosts;            
        }
        // формирования массива репостов
        public function SetRepostArray($_arrayPosts){

            $_arrayPosts=$this->packege->arrayDataName($_arrayPosts,'reposts');
            
            return $_arrayPosts;     
        }

        // формирования массива лайков
        public function SetLikesArray($_arrayPosts){
            $_arrayPosts=$this->packege->arrayDataName($_arrayPosts,'likes');
             
            return $_arrayPosts;     
        }

        // распоковать стили
        public function SetStyleArray($_arrayPosts){

            $_arrayPosts=$this->packege->arrayDataName($_arrayPosts,'styles');
 
            return $_arrayPosts;
        }
        
        // получить вакансии по id people
        public function GetVacancyDataOnIdPeople(){
            // вакансии   
            $postArray=array();
            // запрос на все вакансии
            $stringQuery="SELECT * FROM Vacancys WHERE Autor=$this->idUser";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            // объект с данными 
            do {
                    $postRow =$this->packege->vacancy($row);
                        // добавление в массив и сформировали ответ по новостям
                 array_push($postArray,$postRow);
            } while($row = mysql_fetch_array($query));
            return $postArray;
        }
  
        // получить вакансии по id page
        public function GetVacancyDataOnIdPage(){
                // вакансии   
                $postArray=array();
                // запрос на все вакансии
                $stringQuery="SELECT * FROM PublicPages WHERE Id=$this->idPage";           
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                $posts=$this->packege->arrayData($row,'vacancy');            
                // сохранение данных о публичной странице
                $PublicPage=$row;
                  // запрос на все вакансии
                $stringQuery="SELECT * FROM Vacancy WHERE Id IN (".implode(",", $posts).")";           
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                // объект с данными 
                do {
                    $postRow=$this->packege->vacancy($row);
                    // добавление в массив и сформировали ответ по новостям
                    array_push($postArray,$postRow);
                } while($row = mysql_fetch_array($query));
                $megaData=$this->packege->publicPage($postArray,'vacancy',$PublicPage);  
            return $megaData;
        }
        // установить id пользователя
        public function SetUserId($_idUser){
            $this->idUser=$_idUser;
        }

        // установить id page 
        public function SetPageId($_idPage){
            $this->idPage=$_idPage;
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