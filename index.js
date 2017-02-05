/**
 * Created by 毛俊杰 on 2017/2/5 0005.
 */
var express = require('express');
var app = new express();
// 托管静态资源
app.use(express.static('pages'));
app.get("/test",function(req,res,next){
    res.end("hello,this is buffer!");
});
app.listen("3000",function(){
    console.log("project_v3_new is listening on 3000")
});



