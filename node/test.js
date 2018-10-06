var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("yourdb");
  //Find all documents in the customers collection:
  dbo.collection("profile").find({name:"Florry"}).toArray(function(err, result) {
    if (err) throw err;
    console.log("Name : " + result[0].name + ", Email : " + result[0].email);
      db.close();
  });
});
