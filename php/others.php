<?php
    include "conn.php";

    $id=$_POST['id'];
    $sql1="select sid from phone where id='$id'";
    // echo $sql1;
    $result1=$conn->query($sql1);
    $result2=$result1->fetch_assoc();
    $sid=$result2['sid'];
    $sql="select * from phone where sid='$sid'";
    // echo $sql;
    $result=$conn->query($sql);
    $arr=array();
    for($i=0;$i<$result->num_rows;$i++){
        $arr[$i]=$result->fetch_assoc();
    }

    echo json_encode($arr);
    
?>