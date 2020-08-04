//配置
require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'jqcookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie'
    }
});

//引入
require(['jquery', 'jqcookie'], function($) {
    let mod = $('#currentpage').attr('currentmod');
    if (mod) {
        require([mod], function(modname) {
            modname.init();
        });
    }
});