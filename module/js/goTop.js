define(['jquery'], function($) {
    function GoTop(ct) {
        this.ct = ct;
        this.target = $('<button>点我回到顶部</button>');
        this.createNode();
        this.bindEvent();
    }
    GoTop.prototype.bindEvent = function() {
        var _this = this;
        $(window).on('scroll', function() {
            var scrollTop = $('body').scrollTop();
            console.log(scrollTop)
            if (scrollTop > 100) {

                _this.target.stop().fadeIn(1000);
            } else {
                _this.target.stop().fadeOut(1000);
            }
        })
        _this.target.on('click', function() {
            $('body').stop().animate({ 'scrollTop': 0 }, 1000)
        })
    }
    GoTop.prototype.createNode = function() {
        this.ct.append(this.target);
    }

    // var $ct = $('body');

    return GoTop;
})
