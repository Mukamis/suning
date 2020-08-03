<?php
    $sid=$_POST['sid'];
    $sql="select * from phone where sid='$sid";
    $result=$conn->query($sid);
    $arr=[];
    for($i=0;$i<$result->num_rows;$i++){
        $arr[$i]=$result->fetch_assoc();
    }

    echo json_encode($arr);
    
?>