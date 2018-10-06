var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yourdb');
var profile_schema = mongoose.Schema({
    name:String,
    email:String,
    contact:String,
    comments:String,
    status:Boolean
});
var profile_model = mongoose.model("profile",profile_schema);
module.exports = profile_model;
