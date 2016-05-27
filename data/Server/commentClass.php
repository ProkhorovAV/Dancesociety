<?php
//
//     
//     
//       

include_once(dirname(__FILE__).'/Connection.php');
include_once(dirname(__FILE__).'/packageClass.php'); 
include_once(dirname(__FILE__).'/querySQLClass.php'); 
 
// соединение с базой SQL
$connectionBase = mysql_connect($hostBase,$userBase,$passwordBase);
// условия ошибки и выхода

if ((!$connectionBase)||(!mysql_select_db($dbBase,$connectionBase)))
{exit(mysql_error());}
mysql_query('SET NAMES utf8');
/***** тест класса********/
 /*  
$json=json_decode(file_get_contents('php://input'));
$obj=new Comment();
 
// получение комментариев
 $obj->SetUserId($json->data->idPeople);   
$obj->getCommentUserOnId();  
    
echo json_encode($obj->SendData());
  */

/******коней теста*******/

// данные по пользователю
class Comment{
    $packege=NULL;
    // для запросов
    $querySQL=NUL;
    // id пользователя
    private $idUser=NULL;
    // отправка данных
    private $sendArrayData=array();
    // пересенная установлена - есть ошибка по умолчанию
    private $statusErr=true;


         public function GetCommentUserOnId(){
            // получить перечень комментариев
                 $arrayVacancy=$this->getCommentUser();
                 // сформировать данные комментариев
                $arrayVacancy=$this->getCommentData($arrayVacancy);
                 // сформировать данные по пользователю тоько после getCommentData
                $arrayVacancy=$this->getAutorData($arrayVacancy);    
                // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayVacancy;
            } 

   ///////////////////// дополнительные функции////////
            // получить коментарии по пользователю
        public function getCommentUser(){
                
            $postArray=array();
            // запрос на все комментарии
            $stringQuery="SELECT Comments FROM Peoples WHERE Id=$this->idUser";            
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            $CommentArray=$this->packege->arrayData($row,'Comments');            
            return $CommentArray;
            
        }
        // раскрыть комментарии на данные
        public function getCommentData($CommentArray){

            $arrayComment=$this->querySQL->openArrauData($CommentArray,'Comments');
            
            return $arrayComment;

        }
        // расщепление массива авторов
        public function getAutorData($_arrayPosts){          

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
        

        // установить id пользователя
        public function SetUserId($_idUser){
                $this->idUser=$_idUser;

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