define([], function() {
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
            });

        }
    }
});