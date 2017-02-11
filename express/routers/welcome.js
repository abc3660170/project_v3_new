/**
 * Created by 毛俊杰 on 2017/2/5 0005.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    console.log('%s %s %s', req.method, req.url, req.path);
    res.render('index',{title:'express'})
});
module.exports = router;
