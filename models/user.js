var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
require('./quest');

var userSchema = mongoose.Schema({
    _id : String,
    token: String,
    email: String,
    nome: String,
    foto: Object,
    linkbio: String,
    sexo: String,
    quests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quest' }],
    amigos: [{ type: String, ref: 'User' }]
});

module.exports = mongoose.model('User', userSchema);