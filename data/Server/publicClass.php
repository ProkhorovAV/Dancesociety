<?php
//
//     
//     
//       

include_once(dirname(__FILE__).'/Connection.php');
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
$obj->getAllPublicPages(); 
echo json_encode($obj->SendData());
   */  

/******коней теста*******/

// данные по пользователю
class PublicPages{
    // id пользователя
    private $idUser=NULL;
    // отправка данных
    private $sendArrayData=array();
    // пересенная установлена - есть ошибка по умолчанию
    private $statusErr=true;

        // публичные страницы
         public function getAllPublicPages(){
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

 

   ///////////////////// дополнительные функции////////
         // получить все публичные странички
            public function GetPublicPagesData(){
                $postArray=array();
                // запрос на все новости
                $stringQuery="SELECT * FROM PublicPage";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                // объект с данными 
                do {
                        $postRow=array(
                            id=>$row['Id'],
                            autor=>$row['Autor'],
                            title=>$row['Title'],
                            text=>$row['Text'],
                            likes=>$row['Likes'],
                            repost=>$row['Repost'],                            
                            created=>$row['Created'],
                            remove=>$row['Remove'],                             
                            vacancy=>$row['Vacancy'],
                            post=>$row['Post'],
                            comments=>$row['Comments'],
                            photo=>$row['Photo']
                        );
                            // добавление в массив и сформировали ответ по новостям
                     array_push($postArray,$postRow);
                } while($row = mysql_fetch_array($query));
                return $postArray;
            }

             // формирования массива лайков
            public function SetLikesArray($_arrayPosts){
                 // цикл переборки                 
                    for ($i=0;$i< count($_arrayPosts); $i++) { 
                        // расщипить                
                        $likeArray=explode("*",$_arrayPosts[$i]['likes']);
                        // удалеие последнего элемента пустого                       
                         array_pop($likeArray);
                        // переопреелить          
                        $_arrayPosts[$i]['likes']=$likeArray;                                      
                    } 
                return $_arrayPosts;     
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
            // формирования массива репостов
            public function SetRepostArray($_arrayPosts){
                 // цикл переборки                 
                    for ($i=0;$i< count($_arrayPosts); $i++) { 
                        // расщипить                
                        $repostArray=explode("*",$_arrayPosts[$i]['repost']);
                        // удалеие последнего элемента пустого                       
                         array_pop($repostArray);
                        // переопреелить          
                        $_arrayPosts[$i]['repost']=$repostArray;                                      
                    } 
                return $_arrayPosts;     
            }

/////////////// функции обязательные для всех

        // конструктор
        public function __construct(){
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