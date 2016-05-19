<?php
header('Access-Control-Allow-Origin: *');

// новости с видео
class Video{

private $id_user;

    public function __construct($_id_user){
        $this->id_user=$_id_user;
    }
     public function send(){
        $elem=array();
        $elem['groupAuthor']=array(
                                    _id=>1,
                                     photo=>'data/img/bg1.jpg'
                                    );
        $elem['author']= array(
                                userpic=>'data/user/face.jpg',
                                firstname=>'Александр',
                                secondname=>"Прохоров"
                         );
        $elem['created']='12.12.2012';
        $elem['title']='Название';
        $elem['text']='Просто текст';
        $elem['photos']=array();
            $photo1['path']='data/img/bg1.jpg';
            array_push($elem['photos'], $photo1);
            $photo1['path']='data/img/bg2.jpg';
            array_push($elem['photos'],$photo1);
        $elem['videos']=array();
            $video=array(
                    thumb=>'data/img/bg1.jpg',
                    likes=>10
                    );
            array_push($elem['videos'],$video);
        $elem['reposts']=3;
        $elem['isLiked']=true;
        $elem['likes']=10;
            $data=array();
            $author=array(userpic=>'data/img/bg1.jpg',
                                       firstname=>'Александр',
                                       secondname=>'Прохоров',
                                       _id=>1);
            $created=array(created=>'12.12.2019');
            $text=array(text=>'обычный текст');
            $data=array(author=>$author,
                        created=> $created,
                        text=>$text
                        );
            $datalist=array();
            array_push($datalist,$data);
        $elem['comments']=array(data=>$datalist);
        $mess=array($elem,$elem);
        $data=array(data=>$mess);
        return $data;
     }

}
// класс получения данных мои подписки
class VideoSubscribers{

private $id_user;

    public function __construct($_id_user){
        $this->id_user=$_id_user;
    }
     public function send(){
        $elem=array();
            $elem['author']=array(name=>'Александр',
                                    created=>'12.12/2011',
                                    firstname=>'Владимирович',
                                    secondname=>"Прохоров",
                                    _id=>1
                                    );
            $elem['title']='Супер новость1';
            $elem['photos']=array();
            array_push($elem['photos'], 'img/bg1.jpg', 'img/bg2.jpg');
            $elem['videos']=array();
            $video['thumb']='img/bg2.jpg';
            $video['title']='Класс видео';
            $video['likes']=10;
            array_push($elem['videos'],$video);
            $elem['reposts']=1;
            $elem['isLiked']=true;
            $elem['likes']=1;
            $author=array(face=>'img/bg2.jpg',
                          firstname=>"Александр",
                          secondname=>'Прохоров',
                          _id=>1);
            $data=array(author=>$author,
                        created=>'12.12.2015');
            $datalist=array();
            array_push($datalist,$data);
            $elem['comments']=array(data=>$datalist);
        $mess=Array($elem,$elem);
            return $mess;
     }
}
// класс получения данных по user
class getTopUserVideo{

private $id_user;

    public function __construct($_id_user){
        $this->id_user=$_id_user;
    }

     public function send(){
        $post=array();

             $post['groupAuthor']=array(
                             _id=>1,
                             photo=>'data/user/face.jpg',
                             name=>'Группа 1'
                            );
            $post['author']=array(
                            userpic=>'img/bg2.jpg',
                            firstname=>'Саша',
                            secondname=>'Прохоров'
                            );

            $post['created']='12.12.2013';
            $post['title']='Супер пупер';
            $post['text']='просто текст';
            $photos=array();

            array_push($photos, 'img/bg1.jpg', 'img/bg2.jpg');
            $post['photos']=$photos;
            $video=array();

                $data=array(
                         thumb=>'img/bg4.jpg',
                         title=>'Видео 1',
                         likes=>10
                            );

            array_push($video,$data);
            $post['video']=$video;
            $post['reposts']='Репост';
            $post['isLiked']=23;
            $author=array(
                         userpic=>'data/img/bg1.jpg',
                         firstname=>'Саша',
                         secondname=>"Прохоров",
                         _id=>1
                            );
            $data=array(
                        author=>$author,
                        created=>"12.02.12",
                        text=>"Просто текст"
                        );
            $datalist=array();
            array_push($datalist,$data);
            $post['comments']=array(data=>$datalist);
            $postlist=array();
            array_push($postlist,$post);
            $elem=array(
                        posts=>$postlist,
                        userpic=>'img/bg1.jpg',
                        firstname=>"Имя",
                        secondname=>'Фамилия',
                        subscribersCount=>10,
                        isFollowing=>false,
                        _id=>1
                            );
        $mess=Array($elem);
            return $mess;

     }
}



?>