define(['jquery'],function($){
    function LazyLoad($dom) {
        this.$dom = $dom;
        this.initImg($dom)
        this.init();
    }

    LazyLoad.prototype = {
        init: function(){
            var _this = this;
            $(window).on('scroll', function () {
                _this.initImg(_this.$dom)
            })
        },
        initImg: function($dom){
            var _this = this;
            $dom.not('.loaded').each(function () {
                if (_this.isVisible($(this))) {
                    _this.showImg($(this));
                    $(this).addClass('loaded')
                }
            })
        },
        isVisible: function($dom){
            var screenHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            var domHeight = $dom.outerHeight();
            var offsetTop = $dom.offset().top;
            if (screenHeight + scrollTop > offsetTop && scrollTop < offsetTop + domHeight) {
                return true;
            }
            return false;
        },
        showImg: function($dom){
            var src = $dom.attr('data-src');
            $dom.attr('src', src);
        }
    }

    return LazyLoad;
})