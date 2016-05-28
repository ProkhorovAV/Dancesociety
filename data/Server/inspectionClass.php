 <?php
// класс проверки и очистки данных

 class Inspection{

 	// очистка данных
 	public function ClearData($value, $name){
	 	$value = trim($value);
	    $value = stripslashes($value);
	    $value = strip_tags($value);
	    $value = htmlspecialchars($value);
	    if ($value=="") {exit('Запрос не содержит данных. Переменная '.$name);}
	    	else {return $value;}
	    
 	}

 	// проверка размера
 	public function CheckLength($value = "", $min, $max, $name){
 		$result = (mb_strlen($value) < $min || mb_strlen($value) > $max);
 		$lenghtstr=mb_strlen($value);
 		if ($result) exit('Превышена длина запроса. Переменная '.$name.' значение '.$lenghtstr);
    return $result;
 	}

 }
 

?>