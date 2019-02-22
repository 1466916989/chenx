function move(ele, targetObj, time, callback) {
    if (typeof ele == 'string') {
        ele = document.querySelector(ele);
    }
    clearInterval(ele.timer);
    const speedObj = {};
    var initObj = {}
    for (var attr in targetObj) {
        var init = parseFloat(getStyle(ele, attr));
        if (attr === 'opacity') {
            init *= 100;
        }
        var target = targetObj[attr];
        speedObj[attr] = (target - init) / (time / 10);
    }
    ele.timer = setInterval(() => {
        var flag = true;
        for (var attr in targetObj) {
            var init = parseFloat(getStyle(ele, attr));
            if (attr === 'opacity') {
                init *= 100;
            }
            var speed = speedObj[attr];
            var target = targetObj[attr];
            init += speed;
            if ((speed >= 0 && init >= target) || (speed <= 0 && init <= target)) {
                init = target;
            } else {
                flag = false;
            }
            if (attr == 'opacity') {
                ele.style[attr] = init / 100;
            } else {
                ele.style[attr] = init + 'px';
            }
        }
        if (flag) {
            clearInterval(ele.timer)
            if (typeof callback == 'function') {
                callback(ele);
            }
        }
    }, 10)
}


function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr]
    }
    return obj.currentStyle[attr];
}