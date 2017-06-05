function setRouter(app){ 
 var router = app; 

//假设域名是localhost, 端口是8080

//更多详细使用方法参考 http://www.expressjs.com.cn/guide/routing.html

/**
 * 当 http://localhost:8080/getInfo 的GET请求到来时被下面匹配到进行处理
 * 发送JSON格式的响应数据 {name: 'ruoyu'}
 */
router.get('/getInfo', function(req, res) {

    var resData = [];
    var baseUrl = 'http://placehold.it/250';
    for (var i = 0; i < 5; i++) {
        var color = Math.random().toString(16).substring(2, 8);
        // var width = Math.floor(Math.random() * 200 + 50);
        var height = Math.floor(Math.random() * 100 + 50);
        resData.push(baseUrl + 'x' + height + '/' + color + '/fff');
    }
    setTimeout(function() {
            res.send({ data: resData })
        }, 500)
        // console.log(req.query)
        // info = require(./db.json)
        // res.send(info)
})
}
 module.exports.setRouter = setRouter