// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lagou-admin');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
//users
var usersSchema = mongoose.Schema({
    username: String,
    password: String,
});
var Users = mongoose.model('Users', usersSchema);

//positions
var positionsSchema = mongoose.Schema({
  companyName: String,
  positionName: String,
  city: String,
  createTime: String,
  salary: String,
})
var Positions = mongoose.model('Positions', positionsSchema)

exports.Users = Users
exports.Positions = Positions