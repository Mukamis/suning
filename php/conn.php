<?php
    header("content-type:text/html;charset=utf-8");
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Method:POST,GET');

    define('HOST','localhost');
    define('USER','root');
    define('PASS','root');
    define('DBNAME','suning');

    $conn=@new mysqli(HOST,USER,PASS,DBNAME);
    if($conn->connect_error){
        die('数据库连接失败'.$conn->connect_error);
    }
?>