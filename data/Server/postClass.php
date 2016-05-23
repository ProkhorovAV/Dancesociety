<?php
//
//    здесь можно добавить проверку id пользователя
//    и открыть все для id = -1 (вход без регистрации)
//      поставить код ошибок на функции переработки


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
$obj=new Post();
$obj->SetSkip($json->skip);
$obj->SetCount($json->counts);
$obj->SetUserId($json->userId);
// выводы закоментировать не нужное
// по id user
//$obj->GetUserDataIdUser();
// top новостей по лайкам
//$obj->GetUserDataTop();
// новости от Top пользователей
//$obj->GetPostFromTopUser();
$obj->getPostFromDanciety();
echo json_encode($obj->SendData());
 */

/******коней теста*******/

// данные по пользователю
class Post{
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
    public function GetUserDataIdUser(){
        // получение массив id новостей по id пользователю
        $postArrayId=$this->GetArrayIdUserPost();
        // если имеются новости
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
    public function getPostFromDanciety(){
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

    ////// вспомогательные функции///////

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
                    $postRow=array(
                        id=>$row['Id'],
                        title=>$row['Title'],
                        text=>$row['Text'],
                        autor=>$row['Autor'],
                        likes=>$row['Likes'],
                        repost=>$row['Repost'],
                        created=>$row['Created'],
                        remove=>$row['Remove'],
                        photos=>$row['Photos'],
                        videos=>$row['Videos'],
                        comments=>$row['Comments']
                    );
                        // добавление в массив и сформировали ответ по новостям
                 array_push($postArray,$postRow);
            } while($row = mysql_fetch_array($query));
            return $postArray;
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
                $postRow=array(
                    id=>$row['Id'],
                    title=>$row['Title'],
                    text=>$row['Text'],
                    autor=>$row['Autor'],
                    likes=>$row['Likes'],
                    repost=>$row['Repost'],
                    created=>$row['Created'],
                    remove=>$row['Remove'],
                    photos=>$row['Photos'],
                    videos=>$row['Videos'],
                    comments=>$row['Comments']
                    );
                // добавление в массив и сформировали ответ по новостям
                array_push($resultPost,$postRow);
            }
            return $resultPost;
        }

        // получения топ пользователей
        public function GetArrayTopUserPost(){
            // строка запроса на вычисления подписчиков
            $stringQuery="SELECT Id, Subscribers FROM People";
            // запрос
            $query = mysql_query($stringQuery);
            // получение первой строки
            $row = mysql_fetch_array($query);
            // объект с данными по id Peopele и Subscribers
            $peopleSubObj=array();
            // цикл проверки всех пользователей и внесения id подписчиков в массив
            do {
                // вытащить переменную Likes
                $subUserArray= explode("*",$row['Subscribers']);
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

        // получение данных поста по Top
        public function GetAllPostsTopLikes($_array){
            $resultPost=array();
            for ($i=0; $i < count($_array); $i++) { 
                // запрос
                $stringQuery="SELECT * FROM Post WHERE Id=$_array[$i]";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                $postRow=array(
                    id=>$row['Id'],
                    title=>$row['Title'],
                    text=>$row['Text'],
                    autor=>$row['Autor'],
                    likes=>$row['Likes'],
                    repost=>$row['Repost'],
                    created=>$row['Created'],
                    remove=>$row['Remove'],
                    photos=>$row['Photos'],
                    videos=>$row['Videos'],
                    comments=>$row['Comments']
                    );
                // добавление в массив и сформировали ответ по новостям
                array_push($resultPost,$postRow);
            }
            return $resultPost;
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
                $idUserArray= explode("*",$row['Likes']);
                // удалить пустую строку
                array_pop($idUserArray);
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

        // формирование массива видео
        public function SetVideoArray($_arrayPosts){                 
               // цикл переборки                 
                for ($i=0;$i< count($_arrayPosts); $i++) { 
                    // расщипить                
                    $videoArray=explode("*",$_arrayPosts[$i]['videos']);
                    // удалеие последнего элемента пустого                       
                    array_pop($videoArray);
                    // переменная результата
                    $resultVideoArray=array();
                    // цикл получения полного перечня данных
                    for ($i1=0; $i1 < count($videoArray); $i1++) { 
                         // запрос
                        $stringQuery="SELECT * FROM Video WHERE Id=$videoArray[$i1]";
                        // запрос
                        $query = mysql_query($stringQuery);
                        // получение первой строки
                        $row = mysql_fetch_array($query);
                        // свормировать лайки
                        $elementLikes=explode("*",$row['Likes']);
                        // удалить пустую
                        array_pop( $elementLikes);
                        $element=array(
                                id=>$row['Id'],
                                src=>$row['Src'],
                                title=>$row['Title'],
                                likes=>$elementLikes,                               
                                autor=>$row['Autor'],
                                created=>$row['Created'],
                                repost=>$row['Repost'],
                                remove=>$row['Remove'],
                                imageSrc=>$row['ImageSrc']
                            );
                        array_push($resultVideoArray, $element);
                    }    
                    // переопреелить          
                    $_arrayPosts[$i]['videos']=$resultVideoArray; 
                } 
            return $_arrayPosts;            
        }        

        // формирование массива фотографий
        public function SetPhotoArray($_arrayPosts){  
                // массив переменных id фото
                 $photoArray=array();                 
                // цикл получения ссылок на видео файлы                 
                for ($i=0;$i< count($_arrayPosts); $i++) { 
                    // расщипить                
                    $photoArray=explode("*",$_arrayPosts[$i]['photos']);
                    // удалеие последнего элемента пустого                       
                     array_pop($photoArray);  
                     // массив конечных распакованных фото
                    $resultPhotoArray=array(); 
                    // запрос на каждое фото
                    for ($i1=0; $i1 < count($photoArray); $i1++) { 
                         // запрос
                        $stringQuery="SELECT * FROM Photo WHERE Id=$photoArray[$i1]";
                        // запрос
                        $query = mysql_query($stringQuery);
                        // получение первой строки
                        $row = mysql_fetch_array($query);
                        $element=array(
                                id=>$row['Id'],
                                src=>$row['Src'],
                                title=>$row['Title'],
                                likes=>$row['Likes'],
                                autor=>$row['Autor'],
                                created=>$row['Created'],
                                repost=>$row['Repost'],
                                remove=>$row['Remove']
                            );
                        array_push($resultPhotoArray, $element);
                    }
                     // переопреелить
                    $_arrayPosts[$i]['photos']=$resultPhotoArray;  
                }
           
            return $_arrayPosts;            
        }

        // сформировать и внести данные по автору
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
        // получить все посты
        public function GetAllPosts($_postArrayId){
            // массив новостей
            $postArray=array();
            // запрос
            $this->stringQuery="SELECT * FROM Post WHERE Id IN (".implode(",", $_postArrayId).")";
            // запрос
            $this->query = mysql_query($this->stringQuery);
            // получение первой строки
            $this->row = mysql_fetch_array($this->query);
                    // цикл вывода всех новостей пользователя
                    do {
                        $postRow=array(
                            id=>$this->row['Id'],
                            title=>$this->row['Title'],
                            text=>$this->row['Text'],
                            autor=>$this->row['Autor'],
                            likes=>$this->row['Likes'],
                            repost=>$this->row['Repost'],
                            created=>$this->row['Created'],
                            remove=>$this->row['Remove'],
                            photos=>$this->row['Photos'],
                            videos=>$this->row['Videos'],
                            comments=>$this->row['Comments']
                        );
                        // добавление в массив и сформировали ответ по новостям
                        array_push($postArray,$postRow);
                    } while($this->row = mysql_fetch_array($this->query));
            return $postArray;
        }


        // получение всех новостей и фильтрации их по id user
        public function GetArrayIdUserPost(){
            // массив новостей
            $postArray=array();
            // строка запроса на вычисления подписчиков
            $this->stringQuery="SELECT Id, Repost FROM Post";
            // запрос
            $this->query = mysql_query($this->stringQuery);
            // получение первой строки
            $this->row = mysql_fetch_array($this->query);
            // цикл проверки всех подписанных и внесения id новостей в массив
            do {
                $idUserArray= explode("*",$this->row['Repost']);
                foreach ($idUserArray as $element) {
                    if (($element==$this->userId) and ($element!='')) {
                    array_push($postArray, $this->row['Id']);
                    }
                }
            } while($this->row = mysql_fetch_array($this->query));
            return $postArray;
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
        // установка id users
        public function SetUserId($userId=NULL){
            $this->userId=$userId;
        }  

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
                comments=>$_row['Comments']
            );
            return $postRow;
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