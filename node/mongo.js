var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/yourdb')
.then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
var profile_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    contact:String,
    comments:String,
    status:Boolean
});
var profile_model = mongoose.model('profile',profile_schema);
module.exports = profile_model;
