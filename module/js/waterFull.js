define(['jquery'],function($){
    function WaterFull($dom){
        this.$dom = $dom;
        this.domWidth = $dom.width();
        this.heightArr = [];
        this.cols = Math.round($dom.parent().width() / this.domWidth);

        this.init();
    }

    WaterFull.prototype = {
        init: function(){
            for (var i = 0; i < this.cols; i++) {
                this.heightArr[i] = 0;
            }
            this.render();
        },
        render: function(){
            var _this = this;
            // this.$dom.each(function () {
            //     var minHeight = Math.min.apply(null, _this.heightArr);
            //     var itemIndex = _this.heightArr.indexOf(minHeight);
            //     $(this).css({
            //         'top': _this.heightArr[itemIndex],
            //         'left': itemIndex * _this.domWidth
            //     })
            //     console.log($(this).height())
            //     _this.heightArr[itemIndex] += $(this).height();
            // })
            this.$dom.each(function () {
                // console.log($(this).height())
                var minHeight = Math.min.apply(null, _this.heightArr);
                var itemIndex = _this.heightArr.indexOf(minHeight);
                $(this).css({
                    'top': _this.heightArr[itemIndex],
                    'left': itemIndex * _this.domWidth
                })
                console.log(_this.heightArr)
                _this.heightArr[itemIndex] += $(this).height();

            })
            var maxHeight = Math.max.apply(null, _this.heightArr);
            console.log(maxHeight)
            this.$dom.parent().height(maxHeight);
        }
    }

    return WaterFull;
})