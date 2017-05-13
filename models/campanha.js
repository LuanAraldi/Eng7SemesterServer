var mongoose = require('mongoose');
require('./quest');
require('./user');

var campanhaSchema = mongoose.Schema({
    mestre : String,
    nome : String,
    descricao : String,
    usuarios : [{type : String, ref: 'User'}],
    quests : [{type : mongoose.Schema.Types.ObjectId, ref: 'Quest'}],
    createdAt : Date,
    updatedAt : Date
});

module.exports = mongoose.model('Campanha', campanhaSchema);