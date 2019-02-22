var swiper = (function () {
    var obj,
        $bannerBox,
        $tipBox,
        $tipAll,
        $prevBtn,
        $nextBtn,
        imgWidth,
        timer,
        index = 0;

    return {
        init(ele) {
            obj = document.querySelector(ele);
            imgWidth = obj.clientWidth;
            $prevBtn = obj.querySelector('.left-btn');
            $nextBtn = obj.querySelector('.right-btn');
            $bannerBox = obj.firstElementChild;
            $tipBox = $bannerBox.nextElementSibling;
            $tipAll = $tipBox.children;
            for (let i = 0; i < $tipAll.length; i++) {
                $tipAll[i].index = i;
            }
            var $firstImg = $bannerBox.firstElementChild;
            var $lastImg = $bannerBox.lastElementChild;
            $bannerBox.appendChild($firstImg.cloneNode(true));
            $bannerBox.insertBefore($lastImg.cloneNode(true), $firstImg);
            $bannerBox.style.left = -imgWidth + 'px';

            this.event();
            this.autoPlay();
        },
        event() {
            const self = this;
            $tipBox.addEventListener('click', function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.nodeName === 'LI') {
                    index = target.index;
                    self.showImage();
                    self.autoPlay();
                }
            }, false)
            obj.onmouseover = function () {
                move($prevBtn, { opacity: 100 }, 500);
                move($nextBtn, { opacity: 100 }, 500);
                clearInterval(timer);
            }
            obj.onmouseout = function () {
                move($prevBtn, { opacity: 0 }, 500);
                move($nextBtn, { opacity: 0 }, 500);
                self.autoPlay();
            }
            $prevBtn.onclick = function () {
                index--;
                self.showImage();
                self.autoPlay();
            }
            $nextBtn.onclick = function () {
                index++;
                self.showImage();
                self.autoPlay();
            }
        },
        showImage() {
            if (index < 0) {
                $bannerBox.style.left = -($tipAll.length + 1) * imgWidth + 'px';
                index = $tipAll.length - 1;
            } else if (index > $tipAll.length - 1) {
                $bannerBox.style.left = 0;
                index = 0;
            }
            for (let i = 0; i < $tipAll.length; i++) {
                $tipAll[i].classList.remove('active');

            }
            $tipAll[index].classList.add('active');
            move($bannerBox, { left: -(index + 1) * imgWidth }, 500)
        },
        autoPlay() {
            var self = this;
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                self.showImage();
            }, 1500);
        }
    }
}())
