var mongoose = require('mongoose');

var campanhaSchema = mongoose.Schema({
    mestre : String,
    nome : String,
    descricao : String,
    usuarios : [String],
    quests : [String],
    createdAt : Date,
    updatedAt : Date
});

module.exports = mongoose.model('Campanha', campanhaSchema);