<?php
include_once(dirname(__FILE__).'/Connection.php')
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

    // конструктор
    public function __construct($_id_user=NULL){
        //$this->id_user=$_id_user;
    }
    // загрузка объекта
    public function setData($data){
        $this->email=$data->email;
        $this->password=$data->password;
        $this->firstName=$data->firstName;
        $this->secondName=$data->secondName;
    }

    // отправка ответа
    public function send(){
            $text=array(
                'email'=>$this->email,
                'password'=>$this->password,
                'firstName'=>$this->firstName,
                'secondName'=>$this->secondName
            );
            return $text;
    }

}




?>