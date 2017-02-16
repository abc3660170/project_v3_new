/**
 * Created by 毛俊杰 on 2017/2/14 0014.
 */
var fs = require("fs");
var exists = function(file){
    var exists = false;
    if(fs.existsSync(file)){
        exists = !exists;
    }
    return exists
}

exports.exists = exists;

