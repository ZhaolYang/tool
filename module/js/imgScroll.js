define(['jquery'],function($){
    function ScrollImg(cfg) {
        this.$ct = cfg.ct;
        this.$wrapper = this.$ct.parent();
        this.stepWidth = this.$wrapper.width();
        // this.stepWidth = this.$ct.find('img').width();
        this.$ct.find('li').width(this.stepWidth);
        this.currentIndex = 0;
        this.$prev = cfg.prev;
        this.$next = cfg.next;
        this.isAnimationOver = true;
        this.originLength = this.$ct.children().length;
        this.$barsBtn = cfg.barsBtn;

        this.init();
    }

    ScrollImg.prototype = {
        init: function() {
            var $firstChild = this.$ct.children().eq(0);
            var $lastChild = this.$ct.children().eq(this.$ct.children().length - 1);
            $firstChild.clone().appendTo(this.$ct);
            $lastChild.clone().prependTo(this.$ct);
            this.$ct.css('margin-left', '-' + this.stepWidth + 'px');
            this.$ct.width(this.$ct.children().length * this.stepWidth);
            this.bind();
        },
        move: function(dir) {
            var _this = this;
            if (!this.isAnimationOver) return;
            this.isAnimationOver = false;
            this.$ct.animate({
                'marginLeft': -1 * (this.currentIndex + 1) * this.stepWidth - dir * this.stepWidth + 'px'
            }, 500, function() {
                _this.currentIndex += dir;
                _this.isAnimationOver = true;
                _this.isLimited();
                _this.$barsBtn.removeClass('active').eq(_this.currentIndex).addClass('active');
            })
        },
        bind: function() {
            var _this = this;
            this.$prev.click(function(e) {
                e.preventDefault();
                _this.move(-1);
            })
            this.$next.click(function(e) {
                e.preventDefault();
                _this.move(1);
            })
            this.$barsBtn.click(function() {
                var index = $(this).attr('data-index');
                _this.move(index - _this.currentIndex);
            })
        },
        isLimited: function() {
            if (this.currentIndex === -1) {
                this.currentIndex = this.originLength - 1;
                this.$ct.css('margin-left', -1 * (this.originLength) * this.stepWidth + 'px')
            }
            if (this.currentIndex === (this.originLength)) {
                this.currentIndex = 0;
                this.$ct.css('margin-left', -1 * this.stepWidth + 'px')
            }
        }
    }

    return ScrollImg;
})