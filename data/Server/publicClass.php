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
$obj=new PublicPages();
 
// получение страничек
//$obj->getAllPublicPages(); 
// получение данных по id
//$obj->SetUserId($json->data->idPeople);             
//$obj->getAllPublicPagesOnIdPeople();  
// получить данные по странице по id
$obj->SetPageId($json->data->idPage);             
$obj->getPublicPageOnId();      

echo json_encode($obj->SendData());
   */


/******коней теста*******/

// данные по пользователю
class PublicPages{
     // для упаковки
    private $packege=NULL;
    // для запросов
    private $querySQL=NULL;
     // id страницы
    private $idPage=NULL;
    // id пользователя
    private $idPeople=NULL;
    // отправка данных
    private $sendArrayData=array();
    // пересенная установлена - есть ошибка по умолчанию
    private $statusErr=true;

        // публичные страницы
         public function GetAllPublicPages(){
                // получение всех публичных страниц
                $arrayPosts=$this->GetPublicPagesData();
                // распаковка лайков
                $arrayPosts=$this->SetLikesArray($arrayPosts);
                // распаковка коментариев
                //$arrayPosts=$this->SetCommentsArray($arrayPosts);
                // распаковка автора
                //$arrayPosts=$this->SetAutorInPost($arrayPosts);    
                // распоковать репосты
                $arrayPosts=$this->SetRepostArray($arrayPosts); 
                // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayPosts;

            }
        // публичные страницы по id people
           
         public function GetAllPublicPagesOnIdPeople(){
                // получение всех публичных страниц
                $arrayPosts=$this->GetPublicPagesDataOnId();
                // распаковка лайков
                $arrayPosts=$this->SetLikesArray($arrayPosts);
                // распаковка коментариев
                //$arrayPosts=$this->SetCommentsArray($arrayPosts);
                // распаковка автора
                //$arrayPosts=$this->SetAutorInPost($arrayPosts);    
                // распоковать репосты
                $arrayPosts=$this->SetRepostArray($arrayPosts); 
                // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayPosts;

            }
            // получить данные по публичной странице по id
         public function GetPublicPageOnId(){
            // получение данных по странице
             $arrayPosts=$this->GetDataOnIdPage();

            // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayPosts;

         }
         
 

   ///////////////////// дополнительные функции////////

            // получить все публичные странички
            public function GetPublicPagesData(){
                $postArray=array();
                // запрос на все новости
                $stringQuery="SELECT * FROM PublicPages";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                // объект с данными 
                do {
                    $postRow=$this->packege->public_($row);
                    // добавление в массив и сформировали ответ по новостям
                    array_push($postArray,$postRow);
                } while($row = mysql_fetch_array($query));
                return $postArray;
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
            // получить публичные странички по id автора 
            public function GetPublicPagesDataOnId(){
                $postArray=array();
                // запрос на все новости
                $stringQuery="SELECT * FROM PublicPages WHERE Autor=$this->idPeople";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                // объект с данными 
                do {
                    $postRow=$this->packege->public_($row);
                    // добавление в массив и сформировали ответ по новостям
                    array_push($postArray,$postRow);
                } while($row = mysql_fetch_array($query));
                return $postArray;
            }        

             public function GetDataOnIdPage(){
                    $postArray=array();
                    // запрос на все новости
                    $stringQuery="SELECT * FROM PublicPages WHERE Id=$this->idPage";
                    // запрос
                    $query = mysql_query($stringQuery);
                    // получение первой строки
                    $row = mysql_fetch_array($query);
                    // объект с данными 
                    $postRow=$this->packege->public_($row);
                    // добавление в массив и сформировали ответ по новостям
                                        
                    return $postRow;

             }


           












           

            // формирование массива коментариев
            public function SetCommentsArray($_arrayPosts){   
                         
                    // цикл переборки                 
                    for ($i=0;$i< count($_arrayPosts); $i++) { 
                         // массив комментариев
                        $comments=array();       
                        // расщипить                
                        $commentArray=explode("*",$_arrayPosts[$i]['comments']);
                        // удалеие последнего элемента пустого                       
                        array_pop($commentArray);
                        // запросы на комментарии  
                        for ($i1=0; $i1 <count($commentArray); $i1++) { 
                            // запрос на комментарий с автором
                            $stringQuery="SELECT People.Id as UserId, People.Image, People.FirstName, People.SecondName, Comment.*
                                          FROM Comment INNER JOIN People on (Comment.Id=$commentArray[$i1]) where (Comment.Autor=People.Id)";
                            // запрос
                            $query = mysql_query($stringQuery);
                            // получение данных
                            $row = mysql_fetch_array($query);
                            $element=array(
                                userId=>$row['UserId'],
                                text=>$row['Text'],
                                userPhoto=>$row['Image'],
                                userFirstName=>$row['FirstName'],
                                userSecondName=>$row['SecondName'],
                                created=>$row['Created']
                                );
                            array_push($comments,$element);  
                        }
                        $_arrayPosts[$i]['comments']=$comments;                                      
                    } 
                return $_arrayPosts;            
            }    
             // распокавать автора
            public function SetAutorInPost($_arrayPosts){ 
               
                    // расщепление массива авторов          
                     for ($i=0; $i <count($_arrayPosts) ; $i++) {   

                        $idAutors=$_arrayPosts[$i]['autor'];
                        // строка запроса
                        $stringQuery="SELECT * FROM People WHERE Id=$idAutors";
                        // запрос
                        $query = mysql_query($stringQuery);
                        // получение данных
                        $row = mysql_fetch_array($query);
                        $_arrayPosts[$i]['autor']=array(
                                id=>$idAutors,
                                name=>$row['FirstName'],
                                secondName=>$row['SecondName'],
                                firstName=>$row['FirstName'],
                                image=>$row['Image']
                            );
                     } 
                    return  $_arrayPosts;
            }    
           
               // установить id пользователя
        public function SetUserId($_idPeople){
                $this->idPeople=$_idPeople;

        }
                // установить id пользователя
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