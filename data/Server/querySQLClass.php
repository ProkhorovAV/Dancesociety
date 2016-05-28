<?php
/**
* 
*/
include_once(dirname(__FILE__).'/Connection.php');
include_once(dirname(__FILE__).'/packageClass.php'); 
// соединение с базой SQL
$connectionBase = mysql_connect($hostBase,$userBase,$passwordBase);
// условия ошибки и выхода

if ((!$connectionBase)||(!mysql_select_db($dbBase,$connectionBase)))
{exit(mysql_error());}
mysql_query('SET NAMES utf8');



class QuerySQL{
	// распоковщик
	private $packege=NULL;

	// открыть массив данных по элементу
	public function openArrauData($_arrayData,$_nameTable){
				// перевод в нижний регистр
				$name = mb_strtolower($_nameTable);
 				// цикл переборки                 
                for ($i=0;$i< count($_arrayData); $i++) {                      
                    $resultArray=array();       
                    // расщипить   
                    $dataArray=$this->packege->arrayData($_arrayPosts[$i],$name); 
                    // запросы на комментарии  
                    $stringQuery="SELECT * FROM $_nameTable WHERE Id IN (".implode(",", $dataArray).")";
                    // запрос
                    $query = mysql_query($stringQuery);
                    // получение первой строки
                    $row = mysql_fetch_array($query);                     
                    // цикл 
                        do {
                        	 $dataRow=$this->setPackageData($name,$row);            
                            // добавление в массив и сформировали ответ по новостям
                            array_push($resultArray,$dataRow);
                        } while($row = mysql_fetch_array($query)); 
                    }   
                    // добавить в массив
                $_arrayPosts[$i][$name]=$resultArray;
 
            return $_arrayPosts;            
	}
	// получение данных по автору id из массива 
	public function openDataOnAutor($_arrayPosts){

		 // расщепление массива авторов          
                 for ($i=0; $i <count($_arrayPosts) ; $i++) {   

                    $idAutors=$_arrayPosts[$i]['autor'];
                    // строка запроса
                    $stringQuery="SELECT * FROM Peoples WHERE Id=$idAutors";
                    // запрос
                    $query = mysql_query($stringQuery);
                    // получение данных
                    $row = mysql_fetch_array($query);
                    // формирование переменной people
                    $_arrayPosts[$i]['autor']=$this->packege->people($row);
                 } 
                return  $_arrayPosts;
	}
	// выбор функции упаковки
	public function setPackageData($_name, $_row){
			$dataRow=array();
			// выбрать функцию распаковки
                switch ($_name) {
	                case 'comments':
	               		$dataRow=$this->packege->comment($_row); 
	                break;
	                case 'photos':
	               		$dataRow=$this->packege->photo($_row); 
	                break;
	                case 'posts':
	               		$dataRow=$this->packege->post($_row); 
	                break;
	                case 'videos':
	               		$dataRow=$this->packege->video($_row); 
	                break;
	                 
	                
	                default:
	                 	$dataRow=$_name;
	                break;
                }  
            return $dataRow;         
	}

	 // конструктор
        public function __construct(){
            // для упаковки
             $this->packege=new Pack();
        }

	 
}
//  возможно пригодиться для запроса
//$stringQuery="SELECT People.Id as UserId, People.Image, People.FirstName, People.SecondName, Comment.*
//                                      FROM Comment INNER JOIN People on (Comment.Id=$commentArray[$i1]) where (Comment.Autor=People.Id)";
                        // запрос
?>