define([], function() {
    function ranNum(a, b) {
        return parseInt(Math.random() * (b - a + 1)) + a;
    }

    function ranYzm() {
        let arr = [];
        let str = '';
        for (let i = 0; i < 10; i++) {
            arr.push(i);
        }
        for (let i = 65; i < 91; i++) {
            arr.push(String.fromCharCode(i));
            arr.push(String.fromCharCode(i).toLowerCase());
        }
        for (let i = 0; i < 6; i++) {
            str += arr[ranNum(0, arr.length - 1)];
        }
        return str;
    }
    let cookie = {
        set: function(key, value, day) {
            let d = new Date();
            d.setDate(d.getDate() + day);
            document.cookie = `${key}=${encodeURIComponent(value)};expires=${d};path=/`;
        },
        get: function(key) {
            let arr = decodeURIComponent(document.cookie).split('; ');
            for (let value of arr) {
                let newarr = value.split('=');
                if (key === newarr[0]) {
                    return newarr[1];
                }
            }
        },
        remove: function(key) {
            cookie.set(key, '', -1);
        }
    }

    return {
        ranNum,
        ranYzm,
        cookie
    };
});