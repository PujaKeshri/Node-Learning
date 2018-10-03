var exp = require('express');
var route = exp.Router();
route.post('file/create',function(req,res){
    console.log(req.body);
    res.send("New File Created");
});
route.put('file/update',function(req,res){
    console.log(req.body);
    res.send("File Updated");
});
route.delete('file/delete',function(req,res){
    console.log(req.body);
    res.send("File Deleted");
});
module.exports = route;