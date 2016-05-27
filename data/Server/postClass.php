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
$obj=new Post();
//$obj->SetSkip($json->skip);
//$obj->SetCount($json->counts);
//$obj->SetUserId($json->userId);
// выводы закоментировать не нужное
// по id user
//$obj->GetUserDataIdUser();
// top новостей по лайкам
//$obj->GetUserDataTop();
// новости от Top пользователей
//$obj->GetPostFromTopUser();

// запрос по новостям от сети
//$obj->getPostFromDanciety();
// запрос на новости по id публичной страницы
$obj->setIdPage($json->data->idPage);         
$obj->getPostOnIdPage();

echo json_encode($obj->SendData());
 */

/******коней теста*******/

// данные по пользователю
class Post{
    // id публичной страницы
    private $idPage=NULL;
    //  id пользователя
    private $idPeople=NULL;
    // упаковка
    private $packege=NULL;
    // для  запросов
    private $querySQL=NULL;


    private $counts=NULL;
    private $skip=NULL;
    private $userId=NULL;
    private $row=NULL;
    private $query=NULL;
    private $stringQuery=NULL;
    private $sendArrayData=array();
    // пересенная установлена - есть ошибка по умолчанию
    private $statusErr=true;

    // получить данные по пользователю по id
    public function GetPostDataCountsIdUser(){
        // получение массив id новостей по id пользователю
        $postArrayId=$this->GetArrayIdUserPost();
        // если не имеются новости
        if ($postArrayId[0]==NULL){
            $this->statusErr=true;
            $this->sendArrayData='no news';
            return;
        }
        // получить все новости
        $arrayPosts=$this->GetAllPosts($postArrayId);
        // распоковать пользователя
        $arrayPosts=$this->SetAutorInPost($arrayPosts);
        // распоковать фото
        $arrayPosts=$this->SetPhotoArray($arrayPosts);
        // распоковать видео
        $arrayPosts=$this->SetVideoArray($arrayPosts);
        // распоковать коментарии
        $arrayPosts=$this->SetCommentsArray($arrayPosts);    
        // распоковать лайки
        $arrayPosts=$this->SetLikesArray($arrayPosts);
        // распоковать репосты
        $arrayPosts=$this->SetRepostArray($arrayPosts);  
            // все получилось
        $this->statusErr=false;
        // отправляем данные
        $this->sendArrayData=$arrayPosts;
    }
    // получение данных по Top пользователей 
    public function GetUserDataTop(){
        // получить массив объектов новостей по лайкам
        $arrayPostsTop=$this->GetArrayTopLikesPost();
        // получение в порядке наибольшего like новостей
        $arrayPostsTop=$this->GetAllPostsTopLikes($arrayPostsTop);
        // распоковать пользователя
        $arrayPostsTop=$this->SetAutorInPost($arrayPostsTop);
        // распоковать фото
        $arrayPostsTop=$this->SetPhotoArray($arrayPostsTop);
        // распоковать видео
        $arrayPostsTop=$this->SetVideoArray($arrayPostsTop);
        // распоковать коментарии
        $arrayPostsTop=$this->SetCommentsArray($arrayPostsTop);    
        // распоковать лайки
        $arrayPostsTop=$this->SetLikesArray($arrayPostsTop);
        // распоковать репосты
        $arrayPostsTop=$this->SetRepostArray($arrayPostsTop);  
        
        // все получилось
        $this->statusErr=false;
        // отправляем данные
        $this->sendArrayData=$arrayPostsTop;
    }
    // новости от топ пользователей
    public function GetPostFromTopUser(){
        // получить массив пользователей по подписчикам
        $arrayPostsTop=$this->GetArrayTopUserPost();
        // формирование новостей по рангу пользоателей
        $arrayPostsTop=$this->GetAllPostsFromIdUser($arrayPostsTop);
        // распоковать пользователя
        $arrayPostsTop=$this->SetAutorInPost($arrayPostsTop);
        // распоковать фото
        $arrayPostsTop=$this->SetPhotoArray($arrayPostsTop);
        // распоковать видео
        $arrayPostsTop=$this->SetVideoArray($arrayPostsTop);
        // распоковать коментарии
        $arrayPostsTop=$this->SetCommentsArray($arrayPostsTop);    
        // распоковать лайки
        $arrayPostsTop=$this->SetLikesArray($arrayPostsTop);
        // распоковать репосты
        $arrayPostsTop=$this->SetRepostArray($arrayPostsTop);  
         
        // все получилось
        $this->statusErr=false;
        // отправляем данные
        $this->sendArrayData=$arrayPostsTop;

    }
    // новости от Danciety
    public function GetPostFromDanciety(){
        // все посты
        $arrayPosts=$this->GetAllPostsDanciety();
         // распоковать пользователя
        $arrayPosts=$this->SetAutorInPost($arrayPosts);
        // распоковать фото
        $arrayPosts=$this->SetPhotoArray($arrayPosts);
        // распоковать видео
        $arrayPosts=$this->SetVideoArray($arrayPosts);
        // распоковать коментарии
        $arrayPosts=$this->SetCommentsArray($arrayPosts);    
        // распоковать лайки
        $arrayPosts=$this->SetLikesArray($arrayPosts);
        // распоковать репосты
        $arrayPosts=$this->SetRepostArray($arrayPosts);  

        // все получилось
        $this->statusErr=false;
        // отправляем данные
        $this->sendArrayData=$arrayPosts;
    }

   // получить данные по id публичной страницы
    public function GetPostOnIdPage(){
         
        // получить все новости по id публичной страницы
        $arrayPosts=$this->GetAllPostsOnIdPage($postArrayId);
        // распоковать пользователя
        $arrayPosts['posts']=$this->SetAutorInPost($arrayPosts['posts']);
        // распоковать фото
        $arrayPosts['posts']=$this->SetPhotoArray($arrayPosts['posts']);
        // распоковать видео
        $arrayPosts['posts']=$this->SetVideoArray($arrayPosts['posts']);
        // распоковать коментарии
        $arrayPosts['posts']=$this->SetCommentsArray($arrayPosts['posts']);    
        // распоковать лайки
        $arrayPosts['posts']=$this->SetLikesArray($arrayPosts['posts']);
        // распоковать репосты
        $arrayPosts['posts']=$this->SetRepostArray($arrayPosts['posts']);  
            // все получилось
        $this->statusErr=false;
        // отправляем данные
        $this->sendArrayData=$arrayPosts;
    }



    ////// вспомогательные функции///////

        // установка id users
        public function SetIdPeople($_idPeople=NULL){
            $this->idPeople=$_idPeople;
        }  

        // получение всех новостей и фильтрации их по id user
        public function GetArrayIdUserPost(){
            // массив новостей
            $postArray=array();
            // строка запроса на вычисления подписчиков
            $stringQuery="SELECT Id, Repost FROM Posts";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            // цикл проверки всех подписанных и внесения id новостей в массив
            do {
                $idUserArray= explode("*",$row['Repost']);
                foreach ($idUserArray as $element) {
                    if (($element==$userId) and ($element!='')) {
                        array_push($postArray, $row['Id']);
                    }
                }
            } while($row = mysql_fetch_array($query));
            return $postArray;
        }
        // получить все посты
        public function GetAllPosts($_postArrayId){
            // массив новостей
            $postArray=array();
            // запрос
            $stringQuery="SELECT * FROM Posts WHERE Id IN (".implode(",", $_postArrayId).")";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
                    // цикл вывода всех новостей пользователя
                    do {
                        $postRow=$this->packege->post($row);
                        // добавление в массив и сформировали ответ по новостям
                        array_push($postArray,$postRow);
                    } while($row = mysql_fetch_array($query));
            return $postArray;
        }
        // сформировать и внести данные по автору
        public function SetAutorInPost($_arrayPosts){
                    
                $_arrayPosts= $this->querySQL->openDataOnAutor($_arrayPosts);
                return  $_arrayPosts;
        }
        // формирование массива фотографий
        public function SetPhotoArray($_arrayPosts){ 

             $_arrayPosts= $this->querySQL->openArrauData($_arrayPosts,'Photos');            
             return $_arrayPosts;            
        }
        // формирование массива видео
        public function SetVideoArray($_arrayPosts){                 
               
                $_arrayPosts= $this->querySQL->openArrauData($_arrayPosts,'Videos');   
                return $_arrayPosts;            
        }        
        // формирование массива коментариев
        public function SetCommentsArray($_arrayPosts){   
                     
               $_arrayPosts= $this->querySQL->openArrauData($_arrayPosts,'Comments');     
               return $_arrayPosts;            
        }   
        // формирования массива лайков
        public function SetLikesArray($_arrayPosts){

            $_arrayPosts=$this->packege->arrayDataName($_arrayPosts,'likes');              
            return $_arrayPosts;     
        }
        // формирования массива репостов
        public function SetRepostArray($_arrayPosts){
             // цикл переборки    
                $_arrayPosts=$this->packege->arrayDataName($_arrayPosts,'repost');                 
                return $_arrayPosts;     
        }
        // получение всех новостей и фильтрации их по лайкам
        public function GetArrayTopLikesPost(){
            
            // строка запроса на вычисления подписчиков
            $stringQuery="SELECT Id, Likes FROM Post";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            // объект с данными по id Post и Like
            $postLikesObj=array();
            // цикл проверки всех подписанных и внесения id новостей в массив
            do {
                // вытащить переменную Likes
                $idUserArray=$this->packege->arrayData($row,'Likes');                 
                // создать массив с данными  для id новостей               
                $postLikesObj[$row['Id']]=count($idUserArray);                 
                
            } while($row = mysql_fetch_array($query));
            // сортировать новости  по like           
            arsort($postLikesObj);
            //
            $postResultArray=array();
                // вставить в массив id новостей
                foreach ($postLikesObj as $key => $value) {
                    array_push($postResultArray, $key);
                } 
            return $postResultArray;
        }
        // получение данных поста по Top
        public function GetAllPostsTopLikes($_array){
            $resultPost=array();
            for ($i=0; $i < count($_array); $i++) { 
                // запрос по одному посту
                $stringQuery="SELECT * FROM Post WHERE Id=$_array[$i]";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                $postRow=$this->packege->post($row);                
                // добавление в массив и сформировали ответ по новостям
                array_push($resultPost,$postRow);
            }
            return $resultPost;
        }
        // получения топ пользователей
        public function GetArrayTopUserPost(){
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
                // вытащить переменную 
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
        // получение новостей по пользователем по одному без фильтрации
        public function GetAllPostsFromIdUser($_array){
            // окончательный массив данных
            $resultPost=array();
            // цикл получение новостей по id
            for ($i=0; $i < count($_array); $i++) { 
                // запрос
                $stringQuery="SELECT * FROM Post WHERE Autor=$_array[$i]";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                $postRow=$this->packege->post($row);
                // добавление в массив и сформировали ответ по новостям
                array_push($resultPost,$postRow);
            }
            return $resultPost;
        }
        // получение всех новостей
        public function GetAllPostsDanciety(){
            // новости    
            $postArray=array();
            // запрос на все новости
            $stringQuery="SELECT * FROM Post";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            // объект с данными 
            do {
                $postRow=$this->packege->post($row);
                // добавление в массив и сформировали ответ по новостям
                array_push($postArray,$postRow);
            } while($row = mysql_fetch_array($query));
            return $postArray;
        }
 
        // получение всех новостей
        public function GetAllPostsOnIdPage(){
            // новости    
            $postArray=array();
            // запрос на все новости
            $stringQuery="SELECT * FROM PublicPages WHERE Id=$this->idPage";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            $posts=$this->packege->arrayData($row,'Post');              
            // сохранение данных о публичной странице
            $PublicPage=$row; 
            // строка запроса
            $stringQuery="SELECT * FROM Posts WHERE Id IN (".implode(",", $posts).")";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            do {
                $postRow=$this->packege->post($row);
                // добавление в массив и сформировали ответ по новостям
                array_push($postArray,$postRow);
            } while($row = mysql_fetch_array($query));
            // добавить в общую массу значения постов и публичной страницы

            $megaData=$this->packege->publicPage($postArray,'posts',$PublicPage);           
            return $megaData;
        }
        // установка id публичной страницы 
        public function setIdPage($_idPage){
            $this->idPage=$_idPage;
        }

      

        
       
       
      

      

       
           

       
       

       
       

        


      // формирования массива данных для отправки
        public function PackData($_pack=NULL){
            // добавление в массив строк вывода новостей
            array_push($this->sendArrayData,$_pack);
            return $sendArrayData;
        }

       // установка сколько пропустить
        public function SetSkip($skip=NULL){
            $this->skip=$skip;
        }
        // установка количества
        public function SetCount($counts=NULL){
            $this->counts=$counts;

        }
       
            // получить объект новостей
        public function GetObjPost($_row){
            $postRow=array(
                id=>$_row['Id'],
                title=>$_row['Title'],
                text=>$_row['Text'],
                autor=>$_row['Autor'],
                likes=>$_row['Likes'],
                repost=>$_row['Repost'],
                created=>$_row['Created'],
                remove=>$_row['Remove'],
                photos=>$_row['Photos'],
                videos=>$_row['Videos'],
                comments=>$_row['Comments'],
                isPublic=>$_row['IsPublic']
            );
            return $postRow;
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