define(['jquery.color', 'jquery.lazyload'], function() {
    return {
        init: function() {
            console.log('这个是index页面');
            $menuback = $('#menu_wrap_b');
            $menuli = $('.menu_b_l ul li');
            $menubox = $('.menu_b_l .list-box');
            $menulist = $('.menu_b_l .list-box .list');


            //移到列表，显示相应的内容
            $menuli.on('mouseover', function() {
                $menubox.show();
                $menulist.eq($(this).index()).show().siblings('.list').hide();

                //内容高度和$(window).scrollTop()作比较
                if ($(window).scrollTop() >= $menubox.offset().top) {
                    $menubox.stop(true).animate({
                        top: $(window).scrollTop() - $menuli.eq(0).offset().top
                    });
                } else {
                    $menubox.stop(true).animate({
                        top: 0
                    });
                }
            });
            //鼠标移出，隐藏
            $menuli.on('mouseout', function() {
                $menubox.hide();
            });
            //鼠标移入，显示
            $menulist.on('mouseover', function() {
                $menubox.show();
            });
            //鼠标移出，隐藏
            $menulist.on('mouseout', function() {
                $menubox.hide();
            });

            //2、轮播图效果
            const $picul = $('.menu_b_c'); //图片
            const $pic = $('.menu_b_c ul li'); //图片
            const $btn = $('.menu_b_c ol li'); //按钮
            const $left = $('.left');
            const $right = $('.right');
            let index = 0;
            let mytimer = null;

            let back = ['rgb(45, 37, 174)', 'rgb(22, 172, 255)', 'purple', 'rgb(255, 83, 81)', 'rgb(48, 64, 219)', 'rgb(224, 26, 43)', 'rgb(4, 138, 249)', 'rgb(22, 42, 66)'];

            //$btn
            $btn.on('mouseover', function() {
                index = $(this).index();
                show();
            })

            $pic.eq(index).stop(true).animate({ opacity: 1 }).siblings('li').stop(true).animate({ opacity: 0 });
            $btn.eq(index).css('background', 'red').siblings('li').css('background', 'white');
            $menuback.css('background', back[index]);

            function show() {
                $pic.eq(index).stop(true).animate({ opacity: 1 }).siblings('li').stop(true).animate({ opacity: 0 });
                $btn.eq(index).css('background', 'red').siblings('li').css('background', 'white');
                $menuback.stop(true).animate({
                    backgroundColor: back[index]
                });
                // $menuback.css('background', back[index]);
            }

            $left.on('click', function() {
                index--;
                if (index < 0) {
                    index = $pic.length() - 1;
                }
                show();
            });
            $right.on('click', function() {
                index++;
                if (index > $pic.length - 1) {
                    index = 0;
                }
                show();
            });

            mytimer = setInterval(function() {
                $right.click();
            }, 3000);

            //移入暂停播放
            $picul.on('mouseover', function() {
                clearInterval(mytimer);
            });
            $picul.on('mouseout', function() {
                mytimer = setInterval(function() {
                    $right.click();
                }, 3000);
            });


            //3、楼梯效果
            let $loutibox = $('main>nav');
            let $louti = $('main>nav li');
            let $louceng = $('.square-box');
            console.log($loutibox);
            console.log($louti);
            console.log($louceng);
            //1、scrolltop超过500就显示
            if ($(window).scrollTop() > 500) {
                $loutibox.show();
            } else {
                $loutibox.hide();
            }
            $louceng.each(function(index, element) {
                let $top = $(element).offset().top;
                if ($(window).scrollTop() <= $top) {
                    $louti.eq(index).addClass('active').siblings('li').removeClass('active');
                    return false;
                }
            });
            $(window).on('scroll', function() {
                if ($(window).scrollTop() > 500) {
                    $loutibox.show();
                } else {
                    $loutibox.hide();
                }
                // 4、相应页面，相应按钮亮
                $louceng.each(function(index, element) {
                    let $top = $(element).offset().top;
                    if ($(window).scrollTop() <= $top) {
                        $louti.eq(index).addClass('active').siblings('li').removeClass('active');
                        return false;
                    }
                });
            });
            //2、点击左侧按钮，跳转到相应页面
            $louti.not('.last').on('click', function() {
                $(this).addClass('active').siblings('li').removeClass('active');
                console.log($(this).index());
                console.log($louceng.eq($(this).index()).offset().top);
                $('html,body').animate({
                    scrollTop: $louceng.eq($(this).index()).offset().top
                });
            });
            //3、返回顶部
            $('main>nav li:last-of-type').on('click', function() {
                $('html,doby').animate({
                    scrollTop: 0
                });
            });

            //渲染
            let recommendbox = $('.recommend-box');
            $.ajax({
                url: 'http://localhost/suning/php/cnxh.php'
            }).done(function(data) {
                console.log(data);
                let arr = JSON.parse(data);
                console.log(arr);
                let htmlstr = '';
                for (let value of arr) {
                    htmlstr += `
                    <div class="recommend">
                        <div class="img">
                            <img class="lazy" data-original="${value.img}" width="200" height="200">
                        </div>
                        <div class="box">
                            <p class="ms-price" title="${value.title}">${value.title}</p>
                            <p class="ms-price">
                                <span class="gbPrice"><i>¥</i><em>${value.price}</em></span>
                                <b>找相似</b>
                            </p>
                        </div>
                    </div>
                    `;
                }
                recommendbox.html(htmlstr);
            });
            //懒加载
            $(function() {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            });




        }
    }
});