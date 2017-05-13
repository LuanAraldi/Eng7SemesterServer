var mongoose = require('mongoose');
require('./user');

var mesaSchema = mongoose.Schema({
    nome : String,
    descricao : String,
    usuarios : [{ type : String, ref : 'User' }],
    createdAt : Date,
    updatedAt : Date
});

module.exports = mongoose.model('Mesa', mesaSchema);
