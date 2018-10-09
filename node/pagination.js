var exp = require('express');
var mongo = require('./mongo.js');
//var MongoClient = require('mongodb').MongoClient;
var app = exp();

// Debug code start
const debug = require('debug')('express')
//Debug code stop

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

     mongo.find({},'name email contact comments status',query,function(err,data) {
         // Mongo command to fetch all data from collection.
             if(err) {
                 console.log("err : "+err);
                 response = {"error" : true,"message" : "Error fetching data"};
             } else {
                 console.log("data : "+data);
                 response = {"error" : false,"message" : data};
             }
             res.json(response);
     });


/*var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("yourdb");
    //Find all documents in the customers collection:
    dbo.collection("profile").find({},{},query).toArray(function(err, result) {
        if(err) {
            console.log("err : "+err);
            response = {"error" : true,"message" : "Error fetching data"};
        }else{
            response = {"error" : false, "message" : result, "length" : result.length};
        }
           res.json(response);
        db.close();
    });
  });*/

});

app.get('/saveProfile',function(req,res){
    var myProfile = new mongo({
      name : "Puja",
      email : "puja@gmail.com",
      contact : "1347239910",
      comments : "Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      status : true
    });
    myProfile.save(function(err,data){
      if(err){
          console.log("err : "+err);
          response = {"error" : true,"message" : "Error Saving data"};
      }
      else{
          console.log("data : "+data);
          response = {"error" : false,"message" : data};
      }
      res.json(response);
  });
});

app.listen(3000);