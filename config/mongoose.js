//requiring mongoose and connecting it to database(MongoDB)
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/keepyelling-development', {useNewUrlParser: true});
var db = mongoose.connection;


// on encountering the error we are displaying the error
db.on('error', console.error.bind(console, 'connection error:'));


//once the database is succesfully connected to the database the function is executed
db.once('open', function() {
console.log('Connected to database :: MongoDB');
return
});
module.exports.db=db