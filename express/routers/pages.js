/**
 * Created by 毛俊杰 on 2017/2/10 0010.
 */
var express = require('express');
var router = express.Router();

router.get('/edit',function(req,res,next){
    res.render('edit',{"shit":"姚琳"})
});
router.get('/show',function(){
    res.render('list',{"shit":"姚琳"})
})
module.exports = router;
