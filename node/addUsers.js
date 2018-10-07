var exp = require('express');
var mongoose = require('mongoose');
var app = exp();
mongoose.connect('mongodb://localhost:27017/yourdb')
.then(function(){
    console.log("successfully connected");
},function(){
    console.log("failed to connect");
})
var userSchema = new mongoose.Schema({
    userName : String,
    password : String,
    status : Boolean
});

var userModel = mongoose.model('crendentials',userSchema);
app.get('/saveUser',function(req,res){
    var puja = new userModel({
        userName:"PujaKeshri",
        password : "pk123",
        status: true
    });
    puja.save(function(err,data){
        if(err){
            console.log("err : "+err);
            response = {"error" : true,"message" : "Error Saving data"};
        }
        else{
            console.log("data : "+data);
            response = {"error" : false,"message" : data};
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
app.listen(3000);