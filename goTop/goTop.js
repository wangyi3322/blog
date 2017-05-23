function goTop() {
    this.init();
    this.show();
    this.backTop();
}
goTop.prototype = {
    init: function () {
        var htmls = '<div id="' + 'go-top"' + '>回到顶部</div>';
        $(htmls).appendTo($('body'));
        this.$backTop = $('#go-top');
    },
    show: function () {
        var self = this;
        $(window).on('scroll', function () {
            var scrollTop = $(window).scrollTop();
            if(scrollTop > 100) {
                self.$backTop.show();
            }else {
                self.$backTop.hide();
            }
        });
    },
    backTop: function () {
        this.$backTop.on('click', function () {
            //设置整个文档的顶部，而不是window的顶部
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
        });
    }
};

function GoTop() {
    return new goTop();
}