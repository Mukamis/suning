<?php
    include "conn.php";
    if(isset($_GET['id'])){
        $id=$_GET['id'];
        $sql="select * from phone where id=$id";
        $result=$conn->query($sql);

        echo json_encode($result->fetch_assoc());
    }
    
?>