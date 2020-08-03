define([], function() {
    return {
        init: function() {
            console.log('这个是login页面');

            let submit = $('#submit');
            let username = $('#username');
            let password = $('#password');

            submit.on('click', function() {
                if (!$(username).val()) {
                    alert('用户名不能为空');
                }
                if (!$(password).val()) {
                    alert('密码不能为空');
                }
                $.ajax({
                    type: 'post',
                    url: 'http://localhost/suning/php/login.php',
                    data: {
                        username: username.val(),
                        password: password.val()
                    }
                }).done(function(data) {
                    if (data) {
                        console.log(111);
                        location.href = 'http://localhost/suning/src/shouye.html';
                    } else {
                        alert('用户名或密码错误');
                    }
                });
            });
        }
    }
});