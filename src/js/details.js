define([], function() {
    return {
        init: function() {
            console.log('这个是details页面');
            let $id = location.search.substring(1).split('=')[1];
            let showwrap = $('.show-wrap');
            console.log($id);
            $.ajax({
                type: 'get',
                url: 'http://localhost/suning/php/one.php',
                data: {
                    id: $id
                }
            }).then(function(data) {
                console.log(data);
                // let htmlstr = '';
                let arr = JSON.parse(data);
                console.log(arr);
                console.log(arr.title);
                console.log($('.small img'));
                $('.small img').prop('alt', arr.title);
                // console.log(arr.img);
                $('.small img').prop('src', arr.img);
                console.log($('.small img').src);
                $('.show-title h2').innerHTML = "<span>" + arr.retailer + "</span>" + arr.title;
                // $('.price-left dl:nth-type-of(0)')
                // let arr1 = arr.server.split(';');
                // $.each(arr1, function(index, value) {
                //     htmlstr += `${value}<input type='checkbox' name='server${index}'>`;
                // });
                // let $sid = arr.sid;
                // console.log($sid);
                // $.ajax({
                //     type: 'post',
                //     url: 'http://localhost/suning/php/others.php',
                //     data: {
                //         sid: $sid
                //     }
                // }).done(function(data) {
                //     let arr2 = json.parse(data);
                //     $.each(arr2, function(index, value) {
                //         htmlstr += `${value}`;
                //     });
                // });
                // showwrap.html(htmlstr);
            });
        }
    }
});