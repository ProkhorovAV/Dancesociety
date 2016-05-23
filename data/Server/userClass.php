<?php
include_once(dirname(__FILE__).'/Connection.php');
//include $_SERVER['DOCUMENT_ROOT'].'/data/Php/Connection.php';
// соединение с базой SQL
$connectionBase = mysql_connect($hostBase,$userBase,$passwordBase);
// условия ошибки и выхода

if ((!$connectionBase)||(!mysql_select_db($dbBase,$connectionBase)))
{exit(mysql_error());}
mysql_query('SET NAMES utf8');

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

    // формирования массива данных для отправки
    public function PackData($_row){
        $data=array(
            id=>$_row['Id'],
            image=>$_row['Image'],
            back=>$_row['Back'],
            firstName=>$_row['FirstName'],
            secondName=>$_row['SecondName'],
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
            preference=>$_row['Preferance'],
            subscribers=>$_row['Subscribers'],
            country=>$_row['Country'],
            city=>$_row['City'],
            phone=>$_row['Phone'],
            webside=>$_row['Webside'],
            addres=>$_row['Addres']
        );
        return $data;
    }
    // загрузка объекта
    public function SetData($data){
        $this->email=$data->email;
        $this->password=$data->password;
        $this->firstName=$data->firstName;
        $this->secondName=$data->secondName;
    }
    // получить данные по пользователю
    public function GetUserData(){
        // строка запроса
        $this->stringQuery="SELECT * FROM People WHERE (Email='$this->email') and (Password='$this->password')";
        // запрос
        $this->query = mysql_query($this->stringQuery);
        // получение первой строки
        $this->row = mysql_fetch_array($this->query);
        // если существует (цикл не нужен так как только одна строка может быть)
            if ($this->row['Id']!=NULL){
                 $this->statusErr=false;
                 $this->sendArrayData=$this->PackData($this->row);
            }else{
                 $this->statusErr=true;
                 $this->sendArrayData='userNoUser';
            }
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