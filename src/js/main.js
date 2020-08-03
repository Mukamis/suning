//配置
require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min'
    }
});

//引入
require(['jquery'], function($) {
    let mod = $('#currentpage').attr('currentmod');
    if (mod) {
        require([mod], function(modname) {
            modname.init();
        });
    }
});