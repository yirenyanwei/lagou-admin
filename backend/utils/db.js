// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lagou-admin');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var usersSchema = mongoose.Schema({
    username: String,
    password: String,
});
var Users = mongoose.model('Users', usersSchema);

exports.Users = Users