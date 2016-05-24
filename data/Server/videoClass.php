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
    // отправка данных
    private $sendArrayData=array();
    // пересенная установлена - есть ошибка по умолчанию
    private $statusErr=true;

    // получение всех вакансий
    public function getVideoOnIdUser(){
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
    public function getVideoOnTopUser(){
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
    public function getVideosDanciety(){
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

   ///////////////////// дополнительные функции////////
        // все видео
        public function GetAllVideo(){
            // видео   
            $postArray=array();
            // запрос на все вакансии
            $stringQuery="SELECT * FROM Video";            
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
                        remove=>$row['Remove'],
                        imageSrc=>$row['ImageSrc']                                              
                    );
                        // добавление в массив и сформировали ответ по новостям
                 array_push($postArray,$postRow);
            } while($row = mysql_fetch_array($query));
            return $postArray;
        }

  

        // получить одно видео по топ пользователей
        public function GetOneVideoDataOnIdUser($_array){

            $resultVideo=array();
            for ($i=0; $i < count($_array) ; $i++) {                    
                
                // строка запроса на вычисления подписчиков
                $stringQuery="SELECT * FROM Video where Autor=$_array[$i]";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                $postRow=array(
                        id=>$row['Id'],
                        title=>$row['Title'],
                        src=>$row['Src'],
                        autor=>$row['Autor'],
                        likes=>$row['Likes'],
                        created=>$row['Created'],                         
                        repost=>$row['Repost'],
                        remove=>$row['Remove'],
                        imageSrc=>$row['ImageSrc']                                              
                );
                // условие при котором у пользователя есть видео
                if ($row['Id']!=NULL){
                    array_push($resultVideo, $postRow);  
                }               
            }
            return $resultVideo;
        
        }


           // получиь топ юзеров
        public function GetTopUserOnVideo(){
             // строка запроса на вычисления подписчиков
            $stringQuery="SELECT Id, Reposts FROM People";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            // объект с данными по id Peopele и Reposts
            $peopleSubObj=array();
            // цикл проверки всех пользователей и внесения id подписчиков в массив
                do {
                    // вытащить переменную Likes
                    $subUserArray= explode("*",$row['Reposts']);
                    // удалить пустую строку
                    array_pop($subUserArray);
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


        // получить все видео
        public function GetVideoDataOnId(){
            // видео   
            $postArray=array();
            // запрос на все вакансии
            $stringQuery="SELECT * FROM Video where Autor='$this->idUser'";            
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
                        remove=>$row['Remove'],
                        imageSrc=>$row['ImageSrc']                                              
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