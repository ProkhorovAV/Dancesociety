<?php

/**
* упаковка данных в соответствии с таблицами
*/
class Pack
{	  // пользователи
	  public function people($people){
	 	 $data=array(
            id=>$people['Id'],
            image=>$people['Image'],
            back=>$people['Back'],
            firstName=>$people['FirstName'],
            secondName=>$people['SecondName'],
            email=>$people['Email'],
            status=>$people['Status'],
            male=>$people['Male'],
            age=>$people['Age'],
            height=>$people['Height'],
            weight=>$people['Weight'],
            hairColor=>$people['HeirColor'],
            eyesColor=>$people['EyesColor'],
            nationality=>$people['Nationality'],
            lastUpdate=>$people['LastUpdate'],
            danceStyle=>$people['DanceStyle'],           
            work=>$people['Work'],
            study=>$people['Study'],
            created=>$people['Created'],
            comments=>$people['Comments'],
            reposts=>$people['Reposts'],
            country=>$people['Country'],
            city=>$people['City'],
            phone=>$people['Phone'],
            webside=>$people['Webside'],
            addres=>$people['Addres'],
            back=>$people['Back']               
            );
        return $data;	 	 
	 }
	  // фотографии
	  public function photo($photo){
	 	 $data=array(
                id=>$photo['Id'],
                src=>$photo['Src'],
                title=>$photo['Title'],
                likes=>$photo['Likes'],
                autor=>$photo['Autor'],
                created=>$photo['Created'],
                repost=>$photo['Repost'],
                remove=>$photo['Remove']     
            );
        return $data;	 	 
	 }
	   // комментарии
	  public function comment($comment){
	 	 $data=array(
                id=>$comment['Id'],
                autor=>$comment['Autor'],
                created=>$comment['Created'],
                text=>$comment['Text'],
 				remove=>$comment['Remove'],
                positive=>$comment['Positive']                  
            );
        return $data;	 	 
	 }
	   // видео
	  public function video($video){
	 	 $data=array(
                id=>$video['Id'],
                src=>$video['Src'],
                title=>$video['Title'],
                likes=>$video['Likes'],                               
                autor=>$video['Autor'],
                created=>$video['Created'],
                repost=>$video['Repost'],
                remove=>$video['Remove'],
                imageSrc=>$video['ImageSrc']  
            );
        return $data;	 	 
	 }
	 // новости
	 public function post($post){
			$postRow=array(
                id=>$post['Id'],
                title=>$post['Title'],
                text=>$post['Text'],
                autor=>$post['Autor'],
                likes=>$post['Likes'],
                repost=>$post['Repost'],
                created=>$post['Created'],
                remove=>$post['Remove'],
                photos=>$post['Photos'],
                videos=>$post['Videos'],
                comments=>$post['Comments'],
                isPublic=>$post['IsPublic']
            );
            return $postRow;
	 }
	 // вакансии
	 public function vacancy($vacancy){
			$postRow=array(
                id=>$vacancy['Id'],
                    title=>$vacancy['Title'],
                    text=>$vacancy['Text'],
                    autor=>$vacancy['Autor'],
                    likes=>$vacancy['Likes'],
                    repost=>$vacancy['Repost'],                         
                    photos=>$vacancy['Photos'],
                    videos=>$vacancy['Videos'],
                    comments=>$vacancy['Comments'],
                    country=>$vacancy['Country'],                         
                    city=>$vacancy['City'],
                    start=>$vacancy['Start'],
                    end=>$vacancy['End'],
                    price=>$vacancy['Price'],                         
                    heightStart=>$vacancy['HeightStart'],
                    heightEnd=>$vacancy['HeightEnd'],
                    ageStart=>$vacancy['AgeStart'],
                    ageEnd=>$vacancy['AgeEnd'],
                    styles=>$vacancy['Styles'],
                    isPublic=>$vacancy['IsPublic'],
                    created=>$vacancy['Created']    
            );
            return $postRow;
	 }
      // публичные страницы
     public function public_($public_){
            $postRow=array(
                id=>$public_['Id'],
                autor=>$public_['Autor'],
                title=>$public_['Title'],
                text=>$public_['Text'],
                likes=>$public_['Likes'],
                repost=>$public_['Repost'],                            
                created=>$public_['Created'],
                remove=>$public_['Remove'],                             
                vacancy=>$public_['Vacancy'],
                post=>$public_['Post'],
                comments=>$public_['Comments'],
                photo=>$public_['Photo']  
            );
            return $postRow;
     }


	 // формирование работы index - номер в массиве
	 public function work($_workArray){
		 	$_workArray=$this->arrayData($_workArray,'work');
		 	$elementArray=array();
	  		for ($i=0; $i  < count($_workArray); $i+=4) { 
	            $element=array(
		            name=>$work[$i],
		            start=>$work[$i+1],
		            end=>$work[$i+2],
		            addres=>  $work[$i+3]       
	            );
	            array_push($elementArray, $element);
	        } 
        return $elementArray;

	 }
	 // формирование учебы index - номер в массиве
	 public function study($_stadyArray){
		 	$_stadyArray=$this->arrayData($_stadyArray,'study');
		 	$elementArray=array();
	  		for ($i=0; $i  < count($_stadyArray); $i+=6) { 
	            $element=array(
		            name=>$work[$i],
	                specialisation=>$work[$i+1],
	                start=>$work[$i+2],
	                end=>$work[$i+3],
	                xz=>$work[$i+4],
	                addres=>  $work[$i+5]       
	            );
	            array_push($elementArray, $element);
	        } 
        return $elementArray;

	 }
	 // распаковка массива через *
	 public function arrayData($_array,$name){
			// расщипить                
	        $_array=explode("*",$_array[$name]);
	        // удалеие последнего элемента пустого                       
	        array_pop($_array);	          
        return $_array;

	 }
	 // распокавать массив с указанием переменной
	  public function arrayDataName($_arrayPosts,$_name){
			for ($i=0;$i< count($_arrayPosts); $i++) { 
                $_arrayPosts[$i][$_name]=$this->arrayData($_arrayPosts[$i],$_name);                                   
            } 
            return $_arrayPosts;
	 }	 

	 // распаковка стилей
	 public function styles($_arrayPosts){
			for ($i=0;$i< count($_arrayPosts); $i++) { 
                $_arrayPosts[$i]['danceStyle']=$this->arrayData($_arrayPosts[$i],'danceStyle');                                   
            } 
            return $_arrayPosts;
	 }	  

	 // формирование данных для публичной страницы
	 public function publicPage($_array,$_nameArray,$_page){
	 	  $publicData=array(
                $_nameArray=>$_array,
                title=>$_page['Title'],  
                image=>$_page['Image'] 
            );
	 	  return $publicData;
	 }
	 // функция расшипления свойства на элементы с запросом в базу
}

?>