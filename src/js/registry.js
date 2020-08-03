define(['tool'], function(tool) {
    return {
        init: function() {
            console.log('这个是registry页面');

            let username = $('#username');
            let password = $('#password');
            let yzm = $('#yzm');
            let submit = $('#submit');
            let i = $('i');
            let span = $('span');
            let em = $('em');

            let username_flag = false;
            let password_flag = false;
            let yzm_flag = false;
            let submit_flag = false;

            username.on('blur', function() {
                let reg = /^1[3,5,7,8]\d{9}$/;
                if (username.val() !== '') {
                    if (reg.test($(this).val())) {
                        span.eq(0).html('√');
                        username_flag = true;
                    } else {
                        span.eq(0).html('手机号输入错误');
                        username_flag = false;
                    }
                } else {
                    span.eq(0).html('不能为空');
                    username_flag = false;
                }
            });

            password.on('input', function() {
                let regNum = /\d/;
                let regSmall = /[a-z]/;
                let regBig = /[A-Z]/;
                let regSpecial = /[\+\-\*\/\~\!\@\#\$\%\^\&\*\(\)]/;
                let num = 0;
                if (regNum.test($(this).val())) {
                    num++;
                }
                if (regSmall.test($(this).val())) {
                    num++;
                }
                if (regBig.test($(this).val())) {
                    num++;
                }
                if (regSpecial.test($(this).val())) {
                    num++;
                }
                if (num === 1 || num === 2) {
                    span.eq(1).html('弱');
                } else if (num === 3) {
                    span.eq(1).html('中');
                } else if (num === 4) {
                    span.eq(1).html('强');
                }
            });
            password.on('blur', function() {
                let reg = /[\u4e00-\u9fa5]/g;
                // let regNum = /\d/;
                // let regSmall = /[a-z]/;
                // let regBig = /[A-Z]/;
                // let regSpecial = /[\+\-\*\/\~\!\@\#\$\%\^\&\*\(\)]/;
                if (password.val() !== '') {
                    if ($(this).val().match(reg)) {
                        span.eq(2).html('密码格式错误');
                        password_flag = false;
                    } else {
                        span.eq(2).html('√');
                        password_flag = true;
                    }
                } else {
                    span.eq(2).html('不能为空');
                    password_flag = false;
                }
            });

            yzm.on('blur', function() {
                let reg = /^1[3,5,7,8]\d{9}$/;
                if (yzm.val() !== '') {
                    if (yzm.val().toLowerCase() === i.html().toLowerCase()) {
                        span.eq(3).html('√');
                        yzm_flag = true;
                    } else {
                        span.eq(3).html('验证码输入错误');
                        yzm_flag = false;
                    }
                } else {
                    span.eq(3).html('不能为空');
                    yzm_flag = false;
                }
            });

            i.html(tool.ranYzm());
            i.on('click', function() {
                i.html(tool.ranYzm());
            });

            submit.on('click', function() {
                username.blur();
                password.blur();
                yzm.blur();
                if (username_flag && password_flag && yzm_flag) {
                    console.log('提交');
                }
            });

            username.on('blur', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://localhost/suning/php/registry.php',
                    data: {
                        username: username.val()
                    }
                }).done(function(data) {
                    if (data) {
                        em.eq(0).html('已被注册');
                    } else {
                        em.eq(0).html('可注册');
                    }
                });
            });
        }
    }
});