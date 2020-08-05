<?php
    include "conn.php";
    $sql="select * from phone";
    $result=$conn->query($sql);


    // $num = $result->num_rows; //记录集的总条数  22

    // $pagenum = ceil($num / $pagesize); //获取页数  向上取整  3
    
    
    // //获取前端的传来的页面，根据页码查询对应的数据，返回给前端。
    // if (isset($_GET['page'])) {//接收传入的页面
    //     $pagevalue = $_GET['page'];
    // } else {//没有传入页码，页码为1.
    //     $pagevalue = 1;
    // }
    
    // //偏移量(截取数据库数据)的索引
    // //$pagesize = 10; //单个页面展示的数据条数，自由设置
    // $page = ($pagevalue - 1) * $pagesize;
    
    // //limit
    // //limit接收一个或者两个数字参数(整数)
    // //参1：数据开始位置的索引(从0开始)，偏移量
    // //参2：返回的记录集数目。
    // //select * from taobaogoods limit 0 , 10  从偏移量0开始 取10条
    // //limit 10,10  从偏移量10开始 取10条
    // //limit 20,10 从偏移量20开始  取10条
    
    // $sql1 = "select * from phone limit $page,$pagesize";
    // $res = $conn->query($sql1);



    // $arr = array();
    // for($i=0;$i<$res->num_rows;$i++){
    //     $arr[$i] = $res->fetch_assoc();
    // }

    // echo json_encode($arr);

    
    $arr = array();
    for($i=0;$i<$result->num_rows;$i++){
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
?>