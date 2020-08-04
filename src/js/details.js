define([], function() {
    return {
        init: function() {
            console.log('这个是details页面');
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
            });

            //数量的加减
            let jia = $('.jia');
            let num = $('.num');
            console.log(num);
            $('.jian').on('click', function() {
                console.log(this);
                console.log($('.num'));
                console.log($('.num').val());
                $('.num').val() ++;
            });
        }
    }
});