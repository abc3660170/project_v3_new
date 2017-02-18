/**
 * Created by 毛俊杰 on 2017/2/14 0014.
 */
var config = require("../config");
var fs = require("fs");
var exists = function(file){
    var exists = false;
    if(fs.existsSync(file)){
        exists = !exists;
    }
    return exists
}

var getMongoUrl = function(){
    var url = 'mongodb://'+config.mongo.host+':'+config.mongo.port+'/pm';
    return url;
}

exports.exists = exists;
exports.getMongoUrl = getMongoUrl;

