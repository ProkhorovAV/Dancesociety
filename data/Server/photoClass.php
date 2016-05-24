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
$obj=new Photo();
 
// получение фото
$obj->getAllPhoto();  

echo json_encode($obj->SendData());
  */ 

/******коней теста*******/

// данные по пользователю
class Photo{
    // id пользователя
    private $idUser=NULL;
    // отправка данных
    private $sendArrayData=array();
    // пересенная установлена - есть ошибка по умолчанию
    private $statusErr=true;


         public function getAllPhoto(){
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

 

   ///////////////////// дополнительные функции////////
            // получить все фото
        public function getAllPhotoData(){
                
            $postArray=array();
            // запрос на все вакансии
            $stringQuery="SELECT * FROM Photo";            
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            // объект с данными 
            do {
                    $postRow=array(
                        id=>$row['Id'],
                        title=>$row['Title'],
                        src=>$row['Src'],
                        autor=>$row['Autor'],
                        likes=>$row['Likes'],
                        created=>$row['Created'],                         
                        repost=>$row['Repost'],
                        remove=>$row['Remove']                                                                     
                    );
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


        // установить id пользователя
        public function SetUserId($_idUser){
                $this->idUser=$_idUser;

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