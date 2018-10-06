var exp = require('express');
var mongo = require('./mongo.js');
var app = exp();
app.get('/enquires',function(req,res){
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
            response = {"error" : true,"message" : "invalid page number, should start with 1"};
            return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
    mongo.find({},function(err,data) {
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
    });
});
app.listen(3000);