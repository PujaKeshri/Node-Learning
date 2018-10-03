var http = require('http');
var url = require('url');
var file = require('fs');
http.createServer(function(req,res){
    let myurl = req.url;
    let q =  url.parse(myurl,true);
    console.log(q);
    let fileName ="."+q.pathname;
    file.readFile(fileName,function(err,data){
        let status = null;
        let resData = null;
        if(err){
               status = 404;
               resData = "File Not Found";
        }
        else{
                status = 200;
                resData = data;
        }
        res.writeHeader(status,{'content-Type':'text/html'});
        res.write(resData);
        res.end();
    });
}).listen(8080);