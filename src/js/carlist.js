define([], function() {
    return {
        init: function() {
            console.log('这个是carlist页面');

            //cookie
            let arrbid = [];
            let arrnum = [];

            function getcookie() {
                if ($.cookie('cookiebid') && $.cookie('cookienum')) {
                    arrbid = $.cookie('cookiebid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                } else {
                    arrbid = [];
                    arrnum = [];
                }
            }
            getcookie();
            console.log(arrbid[0]);
            console.log(arrnum[0]);
            let htmlstr = '';
            $.each(arrbid, function(index, value) {
                console.log(arrbid[index]);
                console.log(arrnum[index]);
                $.ajax({
                    type: 'get',
                    url: 'http://localhost/suning/php/one.php',
                    data: {
                        id: arrbid[index]
                    }
                }).done(function(data) {
                    // console.log(data);
                    let arr = JSON.parse(data);
                    // console.log(arr);
                    // console.log(arr.title);
                    htmlstr += `
                    <div class="shop-box">
                    <div class="shop-title">
                        <input type="checkbox" name="allstore1" id="allstore1">
                        <em>${arr.retailer}</em>
                        <i>优惠券</i>
                        <span>运费： ¥0.00</span>
                    </div>
                    <div class="shopwrap">
                        <ul class="shop">
                        <li>
                            <input type="checkbox" name="check" id="check">
                            <img src="${arr.img}" alt="${arr.title}">
                        </li>
                        <li>${arr.title}</li>
                        <li>
                            <p>颜色：${arr.colors}</p>
                            <p>内存：128G</p>
                        </li>
                        <li>¥${arr.price}</li>
                        <li>
                            <p><input type="button" value="-" class="jian"> 
                            <input type="text" value="${arrnum[index]}" class="num"> 
                             <input type="button" value="+" class="jia"></p>
                            <p>最多可买 99件</p>
                        </li>
                        <li>¥${arr.price}</li>
                        <li>
                            <p>移入关注</p>
                            <p>删除</p>
                            <p>查找相似</p>
                        </li>
                        </ul>
                    </div>
                    </div>
                    `;
                    $('.list-box').html(htmlstr);
                    // console.log(htmlstr);
                    $('.shop-right em').html(arrbid.length);

                    //数量的加减
                    console.log($('.jian'));
                    console.log($('.num'));
                    console.log($('.jia'));
                    $('.jian').on('click', function() {
                        // alert($(this).index());//代表第几个商品的减
                        $('.num').eq($(this).index()).val(Number($('.num').eq($(this).index()).val()) - 1);
                        if ($('.num').val() < 1) {
                            $('.num').val(1);
                        }
                    });
                    $('.jia').on('click', function() {
                        console.log($(this));
                        alert($(this).index()); //代表第几个商品的加
                        $('.num').eq($(this).index()).val(Number($('.num').eq($(this).index()).val()) + 1);
                        if ($('.num').eq($(this).index()).val() > 99) {
                            $('.num').eq($(this).index()).val(99);
                        }
                    });
                    $('.num').on('change', function() {
                        if ($('.num').eq($(this).index()).val() > 99) {
                            $('.num').eq($(this).index()).val(99);
                        }
                        if ($('.num').eq($(this).index()).val() < 1) {
                            $('.num').eq($(this).index()).val(1);
                        }
                    });
                });
            });
            // $('.shop').html(htmlstr);
            // $('.shop-title em').html();

        }
    }
});