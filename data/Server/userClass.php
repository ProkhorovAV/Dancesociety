<?php
include_once(dirname(__FILE__).'/Connection.php');
//include $_SERVER['DOCUMENT_ROOT'].'/data/Php/Connection.php';
// соединение с базой SQL
$connectionBase = mysql_connect($hostBase,$userBase,$passwordBase);
// условия ошибки и выхода

if ((!$connectionBase)||(!mysql_select_db($dbBase,$connectionBase)))
{exit(mysql_error());}
mysql_query('SET NAMES utf8');
// проверка класса
 /*
$json=json_decode(file_get_contents('php://input'));
$obj=new User();
$data=$json->data;
// получить данные по пользователю о поролю и логину
$obj->SetData($data);
$obj->GetUserData();
// получить всех пользователей
$obj->getAllUserData();


echo json_encode($obj->SendData());
 */

// данные по пользователю
class User{

private $id_user=NULL;
private $email=NULL;
private $password=NULL;
private $firstName=NULL;
private $secondName=NULL;
private $query=NULL;
private $sendArrayData=NULL;
private $stringQuery=NULL;
private $row=NULL;
// пересенная установлена - есть ошибка по умолчанию
private $statusErr=true;
 
    // получить данные по пользователю
    public function GetUserData(){
       if ($this->GetUserOnEmailPassword()){
                 $this->statusErr=false;
                 $this->sendArrayData=$this->PackData($this->row);
       }else{
                 $this->statusErr=true;
                 $this->sendArrayData='userNoUser';
       }
    }
        // получить все данные о пользователях
        public function getAllUserData(){
                // получить всех пользователе
                $arrayUsers=$this->GetDataAllUsers();
                // сформировать сили
                $arrayUsers=$this->SetStyleArray($arrayUsers);

                // все получилось
                $this->statusErr=false;
                // отправляем данные
                $this->sendArrayData=$arrayUsers;

        }


    // дополнительные  функции/////////////
        // получение всех пользователей
        public function GetDataAllUsers(){
                // массив пользователей
                $postArray=array();
                // строка запроса
                $stringQuery="SELECT * FROM People";
                // запрос
                $query = mysql_query($stringQuery);
                // получение первой строки
                $row = mysql_fetch_array($query);
                    do {
                        $postRow=array(
                                id=>$row['Id'],
                                image=>$row['Image'],                                 
                                firstName=>$row['FirstName'],
                                secondName=>$row['SecondName'],                                
                                age=>$row['Age'],                                 
                                danceStyle=>$row['DanceStyle']                                                                                                 
                        );
                            // добавление в массив и сформировали ответ по новостям
                     array_push($postArray,$postRow);
                } while($row = mysql_fetch_array($query)); 
            return $postArray;
        }


        // получение потльзователя по логину и паролю 
        public function GetUserOnEmailPassword(){
        // строка запроса
            $this->stringQuery="SELECT * FROM People WHERE (Email='$this->email') and (Password='$this->password')";
            // запрос
            $this->query = mysql_query($this->stringQuery);
            // получение первой строки
            $this->row = mysql_fetch_array($this->query);
            // если существует тогда true
                if ($this->row['Id']==NULL){
                     return false;
                }else{                
                    return true;
                }
        }
         // формирования массива стилей
        public function SetStyleArray($_arrayPosts){
             // цикл переборки                 
                for ($i=0;$i< count($_arrayPosts); $i++) { 
                    // расщипить                
                    $styleArray=explode("*",$_arrayPosts[$i]['danceStyle']);
                    // удалеие последнего элемента пустого                       
                     array_pop($styleArray);
                    // переопреелить          
                    $_arrayPosts[$i]['danceStyle']=$styleArray;                                      
                } 
               return $_arrayPosts;     
        }

        // загрузка данных объекта
        public function SetData($data){
            $this->email=$data->email;
            $this->password=$data->password;
            $this->firstName=$data->firstName;
            $this->secondName=$data->secondName;
        }
         // формирования массива данных для отправки
        public function PackData($_row){
            $data=array(
                id=>$_row['Id'],
                image=>$_row['Image'],
                back=>$_row['Back'],
                firstName=>$_row['FirstName'],
                secondName=>$_row['SecondName'],
                email=>$_row['Email'],
                status=>$_row['Status'],
                male=>$_row['Male'],
                age=>$_row['Age'],
                height=>$_row['Height'],
                weight=>$_row['Weight'],
                heirColor=>$_row['HeirColor'],
                eyesColor=>$_row['EyesColor'],
                nationality=>$_row['Nationality'],
                lastUpdate=>$_row['LastUpdate'],
                danceStyle=>$_row['DanceStyle'],           
                work=>$_row['Work'],
                stady=>$_row['Stady'],
                created=>$_row['Created'],
                comments=>$_row['Comments'],
                reposts=>$_row['Reposts'],
                country=>$_row['Country'],
                city=>$_row['City'],
                phone=>$_row['Phone'],
                webside=>$_row['Webside'],
                addres=>$_row['Addres']           
            );
            return $data;
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