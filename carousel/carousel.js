function carousel($ct) {
    this.init($ct);
    this.bind();
    this.autoPlay();
}
carousel.prototype = {
    init: function ($ct) {
        //缓存变量 ↓
        this.$imgCt = $ct.find('.ct-img');
        this.$images = $ct.find('.ct-img>li');
        this.$nextBtn = $ct.find('.next');
        this.$preBtn = $ct.find('.pre');
        this.$bulletCt = $ct.find('.bullet>ul');
        this.$bulletLis = $ct.find('.bullet li');

        this.imgWidth = this.$images.outerWidth(true);
        this.imgLen = this.$images.length;
        this.bulletWidth = this.$bulletLis.outerWidth(true);
        //初始化变量 ↓
        this.imgIndex = 0;
        this.isLoading = false;
        //初始化设置 ↓
        this.$images.first().clone().appendTo(this.$imgCt);
        this.$images.last().clone().prependTo(this.$imgCt);
        this.$imgCt.css({width: (this.imgLen+2) * this.imgWidth});
        this.$imgCt.css({left: -this.imgWidth});
        this.$bulletCt.css({width: this.imgLen * this.bulletWidth});
    },
    bind: function () {
        var self = this;
        //监听两侧按钮 ↓
        this.$nextBtn.on('click', function () {
            self.playNext();
        });
        this.$preBtn.on('click', function () {
            self.playpre();
        });
        //监听底部圆点标记 ↓
        this.$bulletLis.on('mouseenter', function () {
            var bulletIndex = $(this).index();
            if(bulletIndex > self.imgIndex){
                self.playNext(bulletIndex - self.imgIndex)
            }else if(bulletIndex < self.imgIndex){
                self.playpre(self.imgIndex - bulletIndex)
            }
        });
    },
    //定义图片前后滚动方法 ↓
    playNext: function (num) {
        var self = this;
        var count = num || 1;
        if(this.isLoading){return}
        this.isLoading = true;
        this.$imgCt.animate({
            left:  '-=' + this.imgWidth * count
        }, function () {
            self.imgIndex += count;
            if(self.imgIndex === self.imgLen){
                self.imgIndex = 0;
                self.$imgCt.css({
                    left: -self.imgWidth
                })
            }
            self.setBullet();
            self.isLoading = false;
        });
    },
    playpre: function (num) {
        var self = this;
        var count = num || 1;
        if(this.isLoading){return}
        this.isLoading = true;
        this.$imgCt.animate({
            left: '+=' + this.imgWidth * count
        }, function () {
            self.imgIndex -= count;
            if(self.imgIndex < 0){
                self.imgIndex = self.imgLen - 1;
                self.$imgCt.css({
                    left: -self.imgWidth * self.imgLen
                })
            }
            self.setBullet();
            self.isLoading = false;
        });
    },
    //定义底部圆点显示方法 ↓
    setBullet: function () {
        this.$bulletLis.removeClass('active');
        this.$bulletLis.eq(this.imgIndex).addClass('active');
    },
    //定义自动播放方法  ↓
    autoPlay: function () {
        var self = this;
        setInterval(function () {
            self.playNext();
        }, 3000)
    }
};

function Carousel($ct) {
    return new carousel($ct);
}