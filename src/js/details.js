define(['tool'], function() {
    return {
        init: function() {
            console.log('这个是details页面');
            //渲染本产品
            let $id = location.search.substring(1).split('=')[1];
            let showwrap = $('.show-wrap');
            console.log($id);
            var $sid;
            $.ajax({
                type: 'get',
                url: 'http://localhost/suning/php/one.php',
                data: {
                    id: $id
                }
            }).then(function(data) {
                // console.log(data);
                let htmlstr = '';
                let arr = JSON.parse(data);
                // console.log(arr);
                // console.log(arr.title);
                // console.log($('.small img'));
                $('.small img').prop('alt', arr.title);
                // console.log(arr.img);
                $('.small img').prop('src', arr.img);
                // console.log($('.small img').prop('src'));
                $('.show-title h2').innerHTML = "<span>" + arr.retailer + "</span>" + arr.title;
                let arr1 = arr.server.split(';');
                $.each(arr1, function(index, value) {
                    htmlstr += `${value}<input type='checkbox' name='server${index}'>`;
                });
                $('.show-price>dl:nth-of-type(6) p').html(htmlstr);

                // $sid = arr.sid;
                // console.log($sid);

            });
            //渲染相关产品
            let picstr = '';
            let colorstr = '';
            $.ajax({
                type: 'post',
                url: 'http://localhost/suning/php/others.php',
                data: {
                    id: $id
                }
            }).done(function(data) {
                console.log(data);
                let arr2 = JSON.parse(data);
                console.log(arr2);
                $.each(arr2, function(index, value) {
                    picstr += `<li><img src="${value.img}" alt=""></li>`;
                    colorstr += `
                    <a href="http://localhost/suning/src/details.html?id=${value.id}">
                        <img width="40" height="40" src="${value.img}" alt="">
                        <span>${value.colors}</span>
                    </a>`;
                });
                console.log(picstr);
                $('.show-price>dl:nth-of-type(4) p').html(colorstr);
                $('.picurl>nav').html(picstr);

                //切换图片
                $('.picurl>nav li img').on('mouseover', function() {
                    // alert(1);
                    $('.small img').prop('src', $(this).prop('src'));
                });
            });

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
            //数量的加减
            $('.btn').on('click', function() {
                getcookie();
                if (arrbid.indexOf($id) === -1) { //第一次添加
                    arrbid.push($id);
                    arrnum.push($('.num').val());
                } else { //非第一次添加
                    arrnum[arrbid.indexOf($id)] = Number(arrnum[arrbid.indexOf($id)]) + Number($('.num').val());
                }
                console.log(arrbid.join(','));
                console.log(arrnum.join(','));

                $.cookie('cookiebid', arrbid, {
                    expires: 7,
                    path: '/'
                });
                $.cookie('cookienum', arrnum, {
                    expires: 7,
                    path: '/'
                });
                alert('成功加入购物车');
                //原生写法
                // document.cookie = `cookiebid=${arrbid.join(',')};expires=7;path=/`;
                // document.cookie = `cookienum=${arrnum.join(',')};expires=7;path=/`;
            });
            $('.jian').on('click', function() {
                $('.num').val(Number($('.num').val()) - 1);
                if ($('.num').val() < 1) {
                    $('.num').val(1);
                }
            });
            $('.jia').on('click', function() {
                $('.num').val(Number($('.num').val()) + 1);
                if ($('.num').val() > 99) {
                    $('.num').val(99);
                }
            });
            $('.num').on('change', function() {
                if ($('.num').val() > 99) {
                    $('.num').val(99);
                }
                if ($('.num').val() < 1) {
                    $('.num').val(1);
                }
            });



        }
    }
});