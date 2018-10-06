var http = require('http');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

http.createServer(function(req,res){  
// Connection URL
var url = 'mongodb://localhost:27017/yourdb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  res.writeHeader(status,{'content-Type':'text/html'});
  res.write("SUCCESS");
  res.end();
  db.close();
});
}).listen(8080);