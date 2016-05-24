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
$obj=new Vacancy();
$obj->GetAllVacancy(); 
 

echo json_encode($obj->SendData());
*/

/******коней теста*******/

// данные по пользователю
class Vacancy{

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
                    $postRow=array(
                        id=>$row['Id'],
                        title=>$row['Title'],
                        text=>$row['Text'],
                        autor=>$row['Autor'],
                        likes=>$row['Likes'],
                        repost=>$row['Repost'],                         
                        photos=>$row['Photos'],
                        videos=>$row['Videos'],
                        comments=>$row['Comments'],
                        country=>$row['Country'],                         
                        city=>$row['City'],
                        start=>$row['Start'],
                        end=>$row['End'],
                        price=>$row['Price'],                         
                        heightStart=>$row['HeightStart'],
                        heightEnd=>$row['HeightEnd'],
                        ageStart=>$row['AgeStart'],
                        ageEnd=>$row['AgeEnd'],
                        styles=>$row['Styles'],
                        isPublic=>$row['IsPublic'],
                        created=>$row['Created']                        
                    );
                        // добавление в массив и сформировали ответ по новостям
                 array_push($postArray,$postRow);
            } while($row = mysql_fetch_array($query));
            return $postArray;
        }

        // распоковать стили
        public function SetStyleArray($_arrayPosts){
            for ($i=0;$i< count($_arrayPosts); $i++) { 
                // расщипить                
                $commentArray=explode("*",$_arrayPosts[$i]['styles']);
                // удалеие последнего элемента пустого                       
                array_pop($commentArray);
                $_arrayPosts[$i]['styles']= $commentArray;
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