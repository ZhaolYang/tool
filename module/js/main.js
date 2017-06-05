requirejs.config({
    baseUrl: 'js',
    paths: {
        'jquery': 'http://apps.bdimg.com/libs/jquery/1.11.1/jquery.min'
    }
})

requirejs(['jquery', 'goTop', 'imgScroll', 'lazyLoad', 'waterFull'], function($, goTop, imgScroll, lazyLoad, waterFull) {
    // 图片轮播
    new imgScroll({
        ct: $('.scroll-imgs'),
        prev: $('.scroll-prevbtn'),
        next: $('.scroll-nextbtn'),
        barsBtn: $('.btn-container li')
    })

    // 懒加载
    new lazyLoad($('.sailor-img'))

    // 回到顶部
    new goTop($('body'))

    // 动态获取数据瀑布流
    
    var $imgCt = $('#imgCt')
    function getInfo() {
        $.ajax({
            url: '/getInfo',
            type: 'get',
            dataType: 'json',
            success: function(data) {
                console.log(data)
                var imgData = data.data;
                for (var i = 0; i < imgData.length; i++) {
                    var li = document.createElement('li');
                    li.className = 'img-item';
                    $(li).html('<img src="' + imgData[i] + '">');
                    $imgCt.append(li);
                }
                // setTimeout(function() {
                //     new waterFull($('.img-item'));
                // }, 1000)
                var $imgs = $('.steps-wrapper').find('img').not('.loaded');
                var num = $imgs.length;
                $imgs.load(function() {
                    $(this).addClass('loaded')
                    num--;
                    if (num > 0) {
                        return;
                    }
                    new waterFull($('.img-item'));
                })

            },
            error: function() {
                console.log('error')
            }
        })
    }
    getInfo();
    $('.get-more').click(function() {
        getInfo();
    })
})
