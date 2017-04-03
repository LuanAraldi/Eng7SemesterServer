var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    _id : String,
    token: String,
    email: String,
    nome: String,
    quests: [String]
});

module.exports = mongoose.model('User', userSchema);