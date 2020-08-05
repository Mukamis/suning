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
            let htmlstr = '';
            let str = 0;
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
                        <input type="checkbox" name="allstore" id="allstore">
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
                        <li>¥${arr.price*arrnum[index]}.00</li>
                        <li>
                            <p>移入关注</p>
                            <p class="del">删除</p>
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
                    // console.log($('.jian'));
                    // console.log($('.num'));
                    // console.log($('.jia'));
                    //减
                    $('.jian').on('click', function() {
                        // alert($('.jian').index(this)); //代表第几个商品的减
                        $('.num').eq($('.jian').index(this)).val(Number($('.num').eq($('.jian').index(this)).val()) - 1);
                        if ($('.num').val() < 1) {
                            $('.num').val(1);
                        }
                        // arrbid[index] = Number($('.num').eq($('.jian').index(this)));
                        arrnum[$('.jian').index(this)] = $('.num').eq($('.jian').index(this)).val();
                        $.cookie('cookienum', arrnum, {
                            expires: 7,
                            path: '/'
                        });
                    });
                    //加
                    $('.jia').on('click', function() {
                        // alert($('.jia').index(this)); //代表第几个商品的加
                        $('.num').eq($('.jia').index(this)).val(Number($('.num').eq($('.jia').index(this)).val()) + 1);
                        if ($('.num').eq($('.jia').index(this)).val() > 99) {
                            $('.num').eq($('.jia').index(this)).val(99);
                        }
                        arrnum[$('.jia').index(this)] = $('.num').eq($('.jia').index(this)).val();
                        $.cookie('cookienum', arrnum, {
                            expires: 7,
                            path: '/'
                        });
                    });
                    //输入值改变
                    $('.num').on('change', function() {
                        //$('.num').index(this)
                        if ($('.num').eq($('.num').index(this)).val() > 99) {
                            $('.num').eq($('.num').index(this)).val(99);
                        }
                        if ($('.num').eq($(this).index()).val() < 1) {
                            $('.num').eq($(this).index()).val(1);
                        }
                        arrnum[$('.num').index(this)] = $('.num').eq($('.num').index(this)).val();
                        $.cookie('cookienum', arrnum, {
                            expires: 7,
                            path: '/'
                        });
                    });
                    //删
                    $('.del').on('click', function() {
                        arrbid.splice($('.del').index(this), 1);
                        arrnum.splice($('.del').index(this), 1);
                        $.cookie('cookiebid', arrbid, {
                            expires: 7,
                            path: '/'
                        });
                        $.cookie('cookienum', arrnum, {
                            expires: 7,
                            path: '/'
                        });
                        alert('已删除');
                        window.location.reload();
                    });
                    total();
                    //总价变化

                    function total() {
                        // alert("价格" + arr.price);
                        // alert("数量" + arrnum[index]);
                        str += arr.price * arrnum[index];
                        // alert(str);
                        $('.shop-right span:nth-of-type(3) p:nth-of-type(1)').html('总价（含运费）：¥' + str + '.00');
                    }

                    //全选按钮
                    //如果点击全选，所有都选
                    $('#allcheck').on('click', function() {
                        $('input').prop('checked', $('#allcheck').prop('checked'));
                    });
                    $('#allcheck1').on('click', function() {
                        $('input').prop('checked', $('#allcheck1').prop('checked'));
                    });
                    //关联店铺
                    $('.list-box li:nth-of-type(1) input').on('click', function() {
                        // alert($('.list-box li:nth-of-type(1) input').index(this));
                        $('.shop-title #allstore').eq($('.list-box li:nth-of-type(1) input').index(this)).prop('checked', $('.list-box li:nth-of-type(1) input').eq($('.list-box li:nth-of-type(1) input').index(this)).prop('checked'));
                    });
                    $('.shop-title #allstore').on('click', function() {
                        alert($('.shop-title #allstore').index(this));
                        $('.list-box li:nth-of-type(1) input').eq($('.shop-title #allstore').index(this)).click();
                    });
                    ////如果全选了，全选按钮也勾上
                    $('.list-box li:nth-of-type(1) input').on('click', function() {
                        if ($('.list-box li:nth-of-type(1) input').length === $('.list-box li:nth-of-type(1) input:checked').size()) {
                            $('#allcheck1').prop('checked', true);
                            $('#allcheck').prop('checked', true);
                        } else {
                            $('#allcheck1').prop('checked', false);
                            $('#allcheck').prop('checked', false);
                        }
                    });
                });
            });


        }
    }
});