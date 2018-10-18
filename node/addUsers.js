const exp = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
var app = exp();

mongoose.connect('mongodb://localhost:27017/yourdb')
.then(function(){
    console.log("successfully connected");
},function(){
    console.log("failed to connect");
})

var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    status : Boolean
});

var userModel = mongoose.model('crendentials',userSchema);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    //  res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(exp.static(__dirname+'./public'));

var storageVar = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/uploads');
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname+"_"+Date.now());
    }
})
var upload = multer({storage:storageVar});


app.post('/saveUser',function(req,res){
    // var user = new userModel({
    //     userName:"PujaKeshri",
    //     password : "pk123",
    //     status: true
    // });
    res.header("Content-Type", "application/json");
    var data = req.body;
    data['status']=true;
    console.log(data);
    var user = new userModel(data);
    user.save(function(err,result){
        if(err){
            console.log("err : "+err);
            response = {"status" : "Failure","message" : "Error Saving data"};
        }
        else{
            console.log("data : "+result);
            response = {"status" : "Success","message" : result};
        }
        res.json(response);
    })
});

app.get('/getUsers',function(req,res){
    userModel.find(function(err,data){
        if(err){
            console.log("err : "+err);
            response = {"error" : true,"message" : "Error fetching data"};
        }
        else{
            console.log("data : "+data);
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    })
})

app.get('/checkUser',function(req,res){
    var uname = req.query.user;
    var password = req.query.pws;
    userModel.findOne({username:uname,password:password},function(err,result){
        if(err){
            console.log("err : "+err);
            response = {"Status" : "Failure","message" : "Error fetching data"};
        }
        else{
            console.log("data : "+result);
            if(result != null)
                response = {"Status" : "Success","message" : "User Exist","flag":true};
            else
                response = {"Status" :"Success","message":"No Such user Exist","flag":false};
        }
        res.send(JSON.stringify(response));
    })
})

var ItemSchema = new mongoose.Schema({ 
    img: { data: Buffer, contentType: String },
    fileName : String
    });
var ItemModel = mongoose.model('documents',ItemSchema);

app.post('/fileUpload',upload.single('fileupload'),function(req,res){
    var newItem = new ItemModel();
    newItem.img.data = fs.readFileSync('public/images/uploads/'+req.file.filename);
    newItem.img.contentType = 'image/png';
    newItem.fileName = req.file.filename;
    newItem.save(function(err,result){
        if(err){
            console.log("err : "+err);
            response = {"status" : "Failure","message" : "Error Saving Image"};
        }
        else{
            console.log("data : "+result);
            response = {"status" : "Success","message" : result};
        }
        res.json(response);
    });
});

app.listen(3000);