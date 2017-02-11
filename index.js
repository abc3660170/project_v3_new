/**
 * Created by 毛俊杰 on 2017/2/5 0005.
 */
var express = require('express');
var ejs = require('ejs');
var app = new express();
var assert = require('assert');
var index = require('./express/routers/welcome');
var pages = require('./express/routers/pages');
//设置模板引擎
app.set('view engine','ejs');
//手动设置模板目录
app.set('views','express/views');
// 托管静态资源
app.use(express.static('pages'));
app.use('/shit',index);
app.use('/pages',pages);
app.listen("3000",function(){
    console.log("project_v3_new is listening on 3000")
});

var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
   if (err == null)
    console.log("Connected correctly to server");
    console.log("Inserting... to server");
    insertDocuments(db,function(result){
        console.log(result);
        db.close();
    })
    // console.log("Updating... to server");
    // updateDocument(db,function(result){
    //     console.log(result);
    //     db.close();
    // })
    // console.log("deleting... to server");
    // deleteDocument(db,function (result) {
    //     console.log(result);
    //          db.close();
    // })
    // findDocuments(db,function(result){
    //     db.close();
    // })

});
var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('test');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}
var updateDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('test');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 1 }
        , { $set: { b : 1 } }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
            callback(result);
        });
}

var deleteDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('test');
    // Insert some documents
    collection.deleteMany({ a : 1 }, function(err, result) {
        assert.equal(err, null);
        assert.equal(2, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
}

var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('test');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        assert.equal(2, docs.length);
        console.log("Found the following records");
        console.dir(docs);
        callback(docs);
    });
}



