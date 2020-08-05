define(['jquery.pagination'], function() {
    return {
        init: function() {
            console.log('这个是list页面');
            let listwrap = $('.list-wrap');
            $.ajax({
                url: 'http://localhost/suning/php/cnxh.php'
            }).done(function(data) {
                console.log(data);
                let arr = JSON.parse(data);
                console.log(arr);
                let htmlstr = '';
                for (let value of arr) {
                    console.log(value.urlimg);
                    htmlstr += `
                    <a href="details.html?id=${value.id}">
                    <div class="list">
                        <div class="img">
                            <img alt="Apple iPhone 11 128G 黑色 移动联通电信4G全网通手机" src="${value.img}" picpriority="1">
                            <i>
                            <img src="${value.img}">
                            </i>
                        </div>
                        <div class="box">
                            <div class="imgurl">
                            `;
                    // console.log(value.urlimg);
                    let imgurl = value.urlimg.split(';');
                    console.log(imgurl);
                    $.each(imgurl, function(index, value) {
                        console.log(value, index);
                        htmlstr += `
                                <a>
                                    <img width="32" height="32" src="${value}">
                                </a>
                            `;
                    });
                    htmlstr += `
                            </div>
                            <p>￥<span>${value.price}</span></p>
                            <p>${value.title}</p>
                            <p>${value.storage} | 6.1英寸</p>
                            <p><i>90万+</i>评价</p>
                            <p><em>${value.retailer}</em></p>
                            <p><span>预定</span><span>赠品</span></p>
                            <ul>
                                <li>对比</li>
                                <li>关注</li>
                                <li>加入购物车</li>
                            </ul>

                        </div>
                    </div>
                    </a>
                    `;
                }
                listwrap.html(htmlstr);
                console.log($('li:eq(0)'));

                // //排序赋值
                // array_default = [];
                // array = [];
                // prev = null;
                // next = null;

                // $('.list-wrap>a').each(function(index, element) {
                //     array_default[index] = $(this);
                //     array[index] = $(this);
                // });
            });

            // $('.page').pagination({
            //     pageCount: 3,
            //     jump: true,
            //     prevContent: '<',
            //     nextContent: '>',
            //     callback: function(api) {
            //         console.log(api.getCurrent());
            //         $.ajax({
            //             url: 'http://localhost/suning/php/cnxh.php',
            //             date: {
            //                 page: api.getCurrent()
            //             }
            //             // ,
            //             // dataType: 'json'
            //         }).done(function(data) {
            //             console.log(data);
            //             let arr = JSON.parse(data);
            //             console.log(arr);
            //             let htmlstr = '';
            //             for (let value of arr) {
            //                 console.log(value.urlimg);
            //                 htmlstr += `
            //                 <a href="details.html?id=${value.id}">
            //                 <div class="list">
            //                     <div class="img">
            //                         <img alt="Apple iPhone 11 128G 黑色 移动联通电信4G全网通手机" src="${value.img}" picpriority="1">
            //                         <i>
            //                         <img src="${value.img}">
            //                         </i>
            //                     </div>
            //                     <div class="box">
            //                         <div class="imgurl">
            //                         `;
            //                 // console.log(value.urlimg);
            //                 let imgurl = value.urlimg.split(';');
            //                 console.log(imgurl);
            //                 $.each(imgurl, function(index, value) {
            //                     console.log(value, index);
            //                     htmlstr += `
            //                         <a>
            //                             <img width="32" height="32" src="${value}">
            //                         </a>
            //                         `;
            //                 });
            //                 htmlstr += `
            //                         </div>
            //                         <p>￥<span>${value.price}</span></p>
            //                         <p>${value.title}</p>
            //                         <p>${value.storage} | 6.1英寸</p>
            //                         <p><i>90万+</i>评价</p>
            //                         <p><em>${value.retailer}</em></p>
            //                         <p><span>预定</span><span>赠品</span></p>
            //                         <ul>
            //                             <li>对比</li>
            //                             <li>关注</li>
            //                             <li>加入购物车</li>
            //                         </ul>

            //                     </div>
            //                 </div>
            //                 </a>
            //                 `;
            //             }
            //             listwrap.html(htmlstr);

            //             //分页
            //             array_default = [];
            //             array = [];
            //             prev = null;
            //             next = null;

            //             $('.list-wrap>a').each(function(index, element) {
            //                 array_default[index] = $(this);
            //                 array[index] = $(this);
            //             });


            //         });
            //     }
            // });

            // //4.排序
            // //默认排序 - 排序的是array_default数组
            // $('button').eq(0).on('click', function() {
            //     $.each(array_default, function(index, value) { //value就是li标签
            //         $('.list ul').append(value);
            //     });
            //     return;
            // });
            // //升序排序 - array数组
            // $('button').eq(1).on('click', function() {
            //     for (let i = 0; i < array.length - 1; i++) {
            //         for (let j = 0; j < array.length - i - 1; j++) {
            //             //取出array的价格，price进行排序
            //             prev = parseFloat(array[j].find('.price').html().substring(1));
            //             next = parseFloat(array[j + 1].find('.price').html().substring(1));
            //             //通过价格的判断，改变的是li的位置。
            //             if (prev > next) {
            //                 let temp = array[j];
            //                 array[j] = array[j + 1];
            //                 array[j + 1] = temp;
            //             }
            //         }
            //     }

            //     //换完li位置，进行渲染。
            //     $.each(array, function(index, value) {
            //         console.log(value); //n.fn.init [li, context: li]
            //         $('.list ul').append(value);
            //     });
            // });

            // //降序
            // $('button').eq(2).on('click', function() {
            //     for (let i = 0; i < array.length - 1; i++) {
            //         for (let j = 0; j < array.length - i - 1; j++) {
            //             prev = parseFloat(array[j].find('.price').html().substring(1));
            //             next = parseFloat(array[j + 1].find('.price').html().substring(1));
            //             //通过价格的判断，改变的是li的位置。
            //             if (prev < next) {
            //                 let temp = array[j];
            //                 array[j] = array[j + 1];
            //                 array[j + 1] = temp;
            //             }
            //         }
            //     }
            //     //换完li位置，进行渲染。
            //     $.each(array, function(index, value) {
            //         console.log(value);
            //         $('.list ul').append(value);
            //     });
            // });


        }


    }
});