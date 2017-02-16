/**
 * Created by 毛俊杰 on 2017/2/10 0010.
 */
var express = require('express');
var router = express.Router();
var tools = require('../tools/tools');

// 判断页面是否已经存在
router.post('/exists',function(req,res,next){
    res.send(tools.exists(req.body.url));
});
module.exports = router;
