<?php
// класс ошибок
class Error{
private $errorMesages=NULL;

        // конструктор
        public function __construct(){

        }
        // выбор ошибки и формирования ответа
        public function SendData($_data){
            switch ($_data) {
                case 'userNoUser':
                    $this->errorMesages='Такого пользователя нет в базе';
                break;
            }
            return $this->errorMesages;
        }
}
?>