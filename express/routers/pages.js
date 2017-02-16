/**
 * Created by 毛俊杰 on 2017/2/10 0010.
 */
var express = require('express');
var router = express.Router();

// 跳转到编辑页面
router.get('/edit',function(req,res,next){
    res.render('edit')
});
router.post('/edit/submit',function(req,res,next){
    //todo 新增页面
    var mongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/pm';
    var data = new Object();
    data.name = req.body.name;
    data.url = req.body.url;
    data.tags = req.body.tags.split(",");
    mongoClient.connect(url,function(err,db){
        insertDocuments(db,data,function(result){
            res.send(result);
        })
    });

    // 新增页面方法
    var insertDocuments = function(db, data, callback) {
        // Get the documents collection
        var collection = db.collection('list');
        // Insert some documents
        collection.insertMany([
            data
        ], function(err, result) {
            callback(result);
        });
    }
});

//跳转到列表页面
router.get('/show',function(req,res,next){
    //todo 展示页面列表
    var mongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/pm';
    var data = new Object();
    data.name = req.query.name;
    data.tags = req.query.tags != undefined ? req.query.tags.split(","):req.query.tags;
    mongoClient.connect(url,function(err,db){
        findDocuments(db,data,function(result){
            res.render('list',{"list":result,"condition":req.query});
        })
    });
    var findDocuments = function(db,data, callback) {
        // Get the documents collection
        var collection = db.collection('list');
        var condition = new Object();
        // 条件的判空和异常判断
        if(data.name!=undefined && data.name != null && data.name != ""){
            condition.name = {$regex:data.name,$options:'i'};
        }
        if(data.tags != undefined && data.tags != null && data.tags != "" && data.tags.length > 0){
            condition.tags = {$all:data.tags};
        }
        // Find some documents
        //todo 这地方逻辑有问题
        collection.find(condition).toArray(function(err, docs) {
            //查询日志
            console.dir(condition);
            console.log("Found the following records");
            console.dir(docs);
            callback(docs);
        });
    }
})
module.exports = router;
