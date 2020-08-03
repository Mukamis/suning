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

    return {
        ranNum,
        ranYzm
    };
});