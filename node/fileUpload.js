const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'./public'));

var storageVar = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/uploads');
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname+"_"+Date.now());
    }
})
var upload = multer({storage:storageVar});

app.post('/fileUpload',upload.single('fileupload'),function(req,res,next){
    console.log("inside post");
    var url = 'mongodb://localhost:27017/yourdb';
    MongoClient.connect(url,function(err,db){
        console.log("inside mongo connection");
        assert.equal(null, err)
        insterDocument(db,'public/images/uploads/'+req.file.filename,(err,result)=>{
            db.close();
            res.json({'message':"File Uploaded Successfully"});
        });
    });
});

insterDocument = function(db,filePath,callback){
    var collection = db.collection('users'); 
    collection.insertOne({'imagePath':filePath},(err,result)=>{
        assert.equal(null, err)
        callback(result);
    })
}

app.listen(3000);