<?php
    include('conn.php');
    header('Access-Control-Allow-Origin:*'); 
    header('Access-Control-Allow-Method:POST,GET');


    if(isset($_POST['username'])){
        $username=$_POST['username'];
        $result=$conn->query("select * from user where username='$username'");
        if($result->fetch_assoc()){
            echo true;
        }else{
            echo false;
        }
    }

    if(isset($_POST['submit'])){
        // $username=$_POST['username'];
        // $password=$_POST['password'];
        // echo $name;
        // $result=$conn->query("insert into user values(null,'$username','$password')");
        // header('location:http://localhost/suning/src/login.html');
        
    $username=$_POST['username'];
    $password=$_POST['password'];
    echo $username;
    $result=$conn->query("insert into user values(null,'$username','$password')");
    header('location:http://localhost/suning/src/login.html');
        
        

    }

    
    
?>