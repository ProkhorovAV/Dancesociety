<?php
header('Access-Control-Allow-Origin: *');
include $_SERVER['DOCUMENT_ROOT'].'/data/Server/videoClass.php';




  $json=json_decode(file_get_contents('php://input'));
    $action=$json->data;

echo $action->email;


?>